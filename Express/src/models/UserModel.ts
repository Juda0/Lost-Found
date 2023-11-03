import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserModelInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export default UserModelInstance;
