import { EntityManager, wrap } from "@mikro-orm/core";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./entities/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userRepo.findOne([
      { email: createUserDto.email },
      { username: createUserDto.username },
    ]);

    if (isUserExist) {
      throw new UnprocessableEntityException("Email or username are taken");
    }

    const newUser = new UserEntity();
    const mergeUserData = Object.assign(newUser, createUserDto);

    const user = this.userRepo.create(mergeUserData);
    await this.em.flush();

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      id,
    });

    if (!user) throw new NotFoundException("cant find user by the id");

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne([
      {
        id,
      },
      updateUserDto.email && { email: updateUserDto.email },
      updateUserDto.username && { username: updateUserDto.username },
    ]);

    if (user && user.id !== id && user.email === updateUserDto.email)
      throw new ConflictException("email is already exist");

    if (user && user.id !== id && user.username === updateUserDto.username)
      throw new ConflictException("username is already exist");

    if (!user) throw new NotFoundException("cant find user by the id");

    wrap(user).assign(updateUserDto);
    await this.em.flush();

    return user;
  }

  async remove(id: string): Promise<string> {
    const isSuccess = await this.userRepo.nativeDelete({
      id,
    });

    if (!isSuccess) throw new NotFoundException("cant find user by the id");

    return id;
  }
}
