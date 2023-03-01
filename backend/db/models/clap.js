'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clap.belongsTo(models.User, { foreignKey: 'userId' });
      Clap.belongsTo(models.Story, { foreignKey: 'storyId' });
    }
  }
  Clap.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clap',
  });
  return Clap;
};
