import { wrap } from "@mikro-orm/core";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./entities/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.findAll();
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      id,
    });

    if (!user) throw new NotFoundException("cant find user by the id");

    return user;
  }

  async findOneByEmailOrUsername(email?: string, username?: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne([username && { username: username }, email && { email: email }]);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOne([
      { id },
      updateUserDto.email && { email: updateUserDto.email },
      updateUserDto.username && { username: updateUserDto.username },
    ]);

    if (user && user.id !== id && user.email === updateUserDto.email)
      throw new ConflictException("email is already exist");

    if (user && user.id !== id && user.username === updateUserDto.username)
      throw new ConflictException("username is already exist");

    if (!user) throw new NotFoundException("cant find user by the id");

    wrap(user).assign(updateUserDto);

    const em = this.userRepo.getEntityManager();
    await em.flush();

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
