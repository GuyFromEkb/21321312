import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {
    const token = jwtService.sign(
      {
        id: "1234",
        role: "admin",
      },
      {
        secret: "1234567",
      },
    );

    console.log("token", token);
  }
}
