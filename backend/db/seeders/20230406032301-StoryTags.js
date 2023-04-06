'use strict';

const { QueryInterface } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'StoryTags';
    return queryInterface.bulkInsert(options, [
      {
        storyId: 1,
        tagId: 1
      },
      {
        storyId: 1,
        tagId: 2
      },
      {
        storyId: 2,
        tagId: 1
      },
      {
        storyId: 3,
        tagId: 3
      },
      {
        storyId: 1,
        tagId: 4
      },
      {
        storyId: 2,
        tagId: 5
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'StoryTags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      storyId: {
        [Op.in]: [1,2,3]
      }
    }, {});
  }
};
