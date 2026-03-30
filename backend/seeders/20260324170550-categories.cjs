"use strict";

const categories = [
  { name: "Arcade", slug: "arcade" },
  { name: "Action", slug: "action" },
  { name: "Puzzle", slug: "puzzle" },
  { name: "Sports", slug: "sports" },
  { name: "Strategy", slug: "strategy" },
  { name: "Multiplayer", slug: "multiplayer" }
].map((c) => ({
  ...c,
  created_at: new Date(),
  updated_at: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", {
      slug: categories.map((c) => c.slug),
    });
  },
};
