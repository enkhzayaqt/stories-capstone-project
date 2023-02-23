'use strict';

const { QueryInterface } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        storyId: 1,
        userId: 2,
        comment: 'I really like this story'
      },
      {
        storyId: 1,
        userId: 3,
        comment: 'I agree with this story'
      },
      {
        storyId: 2,
        userId: 1,
        comment: 'I love this story'
      },
      {
        storyId: 2,
        userId: 3,
        comment: 'I do not agree with this story'
      },
      {
        storyId: 3,
        userId: 1,
        comment: 'I want more story'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return QueryInterface.bulkDelete(options, {
      storyId: {
        [Op.in]:[1,2,3]
      }
    }, {})
  }
};
