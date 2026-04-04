"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("games_categories", [
      { game_id: 1, category_id: 5 },
      { game_id: 2, category_id: 3 },
      { game_id: 3, category_id: 3 },
      { game_id: 4, category_id: 5 },
      { game_id: 5, category_id: 2 },
      { game_id: 6, category_id: 3 },
      { game_id: 7, category_id: 3 },
      { game_id: 8, category_id: 5 },
      { game_id: 9, category_id: 2 },
      { game_id: 10, category_id: 2 },
      { game_id: 11, category_id: 5 },
      { game_id: 12, category_id: 3 },
      { game_id: 13, category_id: 3 },
      { game_id: 14, category_id: 4 },
      { game_id: 15, category_id: 3 },
      { game_id: 16, category_id: 3 },
      { game_id: 17, category_id: 1 },
      { game_id: 18, category_id: 2 },
      { game_id: 18, category_id: 6 },
      { game_id: 19, category_id: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
