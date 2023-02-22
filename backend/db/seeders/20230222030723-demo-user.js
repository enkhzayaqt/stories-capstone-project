'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        name: 'Demo',
        email: 'demo@aa.io',
        username: 'Demo-user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        name: 'User1',
        email: 'user1@aa.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        name: 'Use2',
        email: 'user2@aa.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['Demo-user', 'FakeUser1', 'FakeUser2']
      }
    }, {});
  }
};
