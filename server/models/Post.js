// models/users.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Posts', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  });

  return Post;
};
