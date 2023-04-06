'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoryTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // StoryTag.belongsToMany(models.Story, { foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true });
      // StoryTag.belongsToMany(models.Tag, { foreignKey: 'tagId', onDelete: 'CASCADE', hooks: true });
    }
  }
  StoryTag.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StoryTag',
  });
  return StoryTag;
};
