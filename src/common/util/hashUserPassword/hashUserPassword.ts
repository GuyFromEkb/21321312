import { hash } from "bcrypt";

export const hashUserPassword = (password: string, rounds: number) => {
  return hash(password, rounds);
};
