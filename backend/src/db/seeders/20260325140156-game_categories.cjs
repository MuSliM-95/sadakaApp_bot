"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games_categories",
      [
        // RIVALS FPS
        { game_id: 1, category_id: 2 }, // Action
        { game_id: 1, category_id: 6 }, // Multiplayer

        // Block Blast
        { game_id: 2, category_id: 3 }, // Puzzle

        // Plants vs Zombies
        { game_id: 3, category_id: 5 }, // Strategy
        { game_id: 3, category_id: 3 }, // Puzzle

        // Age of Tanks
        { game_id: 4, category_id: 5 }, // Strategy
        { game_id: 4, category_id: 2 }, // Action

        // Tile Farm Story
        { game_id: 5, category_id: 3 }, // Puzzle
      ],
      {}
    );
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
