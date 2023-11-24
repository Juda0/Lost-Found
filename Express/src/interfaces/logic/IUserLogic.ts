import { User } from "../../models/user";

export interface IUserLogic {
  register(username: string, email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<string | null>;
}