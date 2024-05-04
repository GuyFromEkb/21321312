import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("createChat")
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage("findAllChat")
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage("findOneChat")
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage("updateChat")
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage("removeChat")
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  @SubscribeMessage("message:post")
  async handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const newMessage: IMessage = {
      dateAt: Date.now(),
      message: String(data),
      userName: client.handshake.headers.authorization ?? "UnknownUser",
    };

    console.log("message:post", data);
    this.server.emit("message:new", newMessage, (response: any) => {
      if (!response.error) {
        //   this.chatService.writeMessageToDB(newMessage);
      }
    });
  }

  async handleConnection(client: Socket) {
    const userName = client.handshake.headers.authorization;

    console.log("handleConnection", userName);

    client.emit("message:history", await this.chatService.findAll());
    client.broadcast.emit("log", `${userName} connected`);
  }

  handleDisconnect(client: Socket) {
    const userName = client.handshake.headers.authorization;

    console.log("handleDisconnect", userName);

    client.broadcast.emit("log", `${userName} disconnected`);
  }
}

interface IMessage {
  dateAt: number;
  message: string;
  userName: string;
}
