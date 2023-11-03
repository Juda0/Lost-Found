import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface PostAttributes {
  id: number;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  tags: string | null;
  userId: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public latitude!: number | null;
  public longitude!: number | null;
  public tags!: string | null;
  public userId!: number;

  static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

export function initPostModel(sequelize: Sequelize) {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
}
