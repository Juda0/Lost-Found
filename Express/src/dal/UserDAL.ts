import { ModelStatic, Sequelize } from 'sequelize';
import UserModelInstance from '../models/UserModel'; // Import the UserModelInstance interface

class UserDAL {
  private UserModel: ModelStatic<UserModelInstance>;

  constructor(userModel: ModelStatic<UserModelInstance>) {
    this.UserModel = userModel;
  }

  async createUser(username: string, email: string, password: string): Promise<UserModelInstance> {
    // Create a new user record in the database
    return await this.UserModel.create({ username, email, password });
  }

  async findUserByEmail(email: string): Promise<UserModelInstance | null> {
    // Find a user by email in the database
    return await this.UserModel.findOne({ where: { email } });
  }
}

export default UserDAL;
