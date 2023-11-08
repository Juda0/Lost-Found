export interface IUserLogic {
  register(username: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<string | null>;
}