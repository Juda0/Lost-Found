import { IUserDAL } from "../../src/interfaces/IUserDAL";
import { IUserLogic } from "../../src/interfaces/logic/IUserLogic";

class UserMockLogic implements IUserLogic{
    private dal: IUserDAL;
  
    constructor(dal: IUserDAL) {
      this.dal = dal;
    }
  
    async register(username: string, email: string, password: string): Promise<boolean> {
      // Your registration logic goes here, interacting with this.dal
      // Return true if registration is successful, false otherwise
      try {
        this.dal.createUser(username, email, password);
        return true;
      } catch (error) {
        return false;
      }
    }

    async login(email: string): Promise<any> {
      
    }
  }
  
  export default UserMockLogic;