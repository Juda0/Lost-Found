// DAL Interface
export interface IUserDAL {
  createUser(username: string, email: string, password: string): Promise<void>;
  getUserByEmail(email: string): Promise<any>;
}