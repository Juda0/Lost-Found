import { User } from "../models/user";

// DAL Interface
export interface IUserDAL {
  createUser(username: string, email: string, password: string): Promise<User>;
  getUserByEmail(email: string): Promise<any>;
}