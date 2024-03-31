import { EntityManager } from "@mikro-orm/core";
import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { compare } from "bcrypt";

import { UserEntity } from "~user/entities/user.entity";
import { UserRepository } from "~user/entities/user.repository";
import { UserService } from "~user/user.service";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly em: EntityManager,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const isUserExist = await this.userService.findOneByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );

    if (isUserExist) {
      throw new UnprocessableEntityException("Email or username are taken");
    }

    const newUser = new UserEntity();
    const mergeUserData = Object.assign(newUser, registerDto);

    const user = this.userRepo.create(mergeUserData);
    await this.em.flush();

    return user;
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findOneByEmailOrUsername(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Email or password has wrong value");
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Email or password has wrong value");
    }

    return user;
  }
}
