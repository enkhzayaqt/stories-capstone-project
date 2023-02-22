'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Stories';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        title: '30 days writing challenge on Medium',
        body: 'If you looking to boost your writing skill & consistency, here is a draft that you can use as a starting point. Attention all writers! Are you ready for a challenge that will not only improve your writing skills but also help you build consistency and discipline in your writing practice? Then join me in the 30-Day Writing Challenge, starting on January 1st!',
        image: 'https://miro.medium.com/v2/resize:fit:720/0*DL0YqfK3gVTUdjan'
      },
      {
        userId: 2,
        title: '22 VSCode Plugins to Keep You Awesome in 2023',
        body: 'This article gathers 22 awesome vscode plugins for you to keep going forward 2023.',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*YUHhXdb1tq4kk-EzLvGrMA.png'
      },
      {
        userId: 3,
        title: '5 Python Automation Scripts I Use Every Day',
        body: 'TL;DR- A quick list of the best Python scripts I use on a daily basis, plus some possible modifications that could be made for other functionalities.',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*P-zMVFbvdHA8z_I-.png'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Stories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1,2,3]
      }
    }, {});
  }
};
