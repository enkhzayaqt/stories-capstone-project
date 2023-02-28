'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.User, { foreignKey: 'userId' });
      Story.hasMany(models.Comment, {foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true})
    }
  }
  Story.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image: DataTypes.STRING,
    claps: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};
