'use strict';

const { QueryInterface } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Tags';
    return queryInterface.bulkInsert(options, [
      {
        name: 'sport'
      },
      {
        name: 'coding'
      },
      {
        name: 'health'
      },
      {
        name: 'writing'
      },
      {
        name: 'technology'
      },
      {
        name: 'internet'
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4,5,6]
      }
    }, {});
  }
};
