//Это не правильно, в комон тянуть что-то из модуля
import { UserRole } from "~user/entities/user.entity";

export interface ITokenUserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
