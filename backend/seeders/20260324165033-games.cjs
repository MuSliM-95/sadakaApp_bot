"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          title: "Squad Assembler: Merge",
          url: "https://playgama.com/export/game/squad-assembler-merge",
          description: "Соберите крутую команду...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/b440282a-1552-4b72-c99f-80141ed28400/enlarged",
        },
        {
          title: "Word Finder",
          url: "https://playgama.com/export/game/word-finder",
          description: "Развивайте ум...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/fdf0c23e-29af-4fe8-0d7d-5d2e2f5f2700/enlarged",
        },
        {
          title: "Block Blast",
          url: "https://playgama.com/export/game/block-blast-master",
          description: "Собирай блоки...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/7276cce0-625e-4479-0bae-7612a4ae0c00/w=800,fit=cover",
        },
        {
          title: "Pirates Merge: War Path",
          url: "https://playgama.com/export/game/pirates-merge-war-path",
          description: "Стратегическое приключение...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/ed7dd1cf-7604-4433-0594-682dcbc1ab00/enlarged",
        },
        {
          title: "Snake 2077: Glitch War",
          url: "https://playgama.com/export/game/snake-2077-glitch-war",
          description: "Футуристическая змейка...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/9264da96-18cc-43c1-f439-3b71139a7c00/enlarged",
        },
        {
          title: "Tile Farm Story",
          url: "https://playgama.com/export/game/tile-farm-story",
          description: "Игра три в ряд...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/b3e8d7fc-f50f-4658-f90e-4a432541a600/w=800,fit=cover",
        },
        {
          title: "Royal Jewels Match",
          url: "https://playgama.com/export/game/royal-jewels-match",
          description: "Комбинируйте камни...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/c933b8db-95a9-4377-154d-ae80ef8a2000/enlarged",
        },
        {
          title: "Idle Tower Defense",
          url: "https://playgama.com/export/game/idle-tower-defense-be01-1",
          description: "Создайте TD игру...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/3f7b69b2-1775-4ee2-ced6-e4ae61382300/enlarged",
        },
        {
          title: "Zombie Hunter: Survival",
          url: "https://playgama.com/export/game/zombie-hunter-survival",
          description: "Выживайте против зомби...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/f28fbd56-5f3f-47b4-e034-aa19c0118600/enlarged",
        },
        {
          title: "Turbo Stunt Racing",
          url: "https://playgama.com/export/game/turbo-stunt-racing",
          description: "Гонки и трюки...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/edc18234-be34-4d3d-b009-0e564be1dd00/enlarged",
        },
        {
          title: "Hero Defense King",
          url: "https://playgama.com/export/game/hero-defense-king",
          description: "Защита башни...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/5c043ca4-5d7b-44dd-e0a1-ffa76e9f7800/enlarged",
        },
        {
          title: "Cannon Basket",
          url: "https://playgama.com/export/game/cannon-basket",
          description: "Физическая головоломка...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/99da4a51-49e3-459e-7679-46d650ae7a00/enlarged",
        },
        {
          title: "Word Search Hidden Words",
          url: "https://playgama.com/export/game/word-search-hidden-words",
          description: "Поиск слов...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/772ab21e-e04a-45e8-09ee-c91c88da7600/enlarged",
        },
        {
          title: "Pongoal",
          url: "https://playgama.com/export/game/pongoal",
          description: "Pong + футбол...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/5f8c0fb5-6938-4435-ebbf-82f744827300/enlarged",
        },
        {
          title: "Mahjong Lines",
          url: "https://playgama.com/export/game/mahjong-lines",
          description: "Маджонг...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/43ca2e9d-30dc-4048-997d-41b0f4abbd00/enlarged",
        },
        {
          title: "Italian Brainrot Find the Difference",
          url: "https://playgama.com/export/game/italian-brainrot-find-the-difference",
          description: "Найди отличия...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/d6aefcb8-e733-48bf-74c3-6aa4b0f3b800/enlarged",
        },
        {
          title: "Eggy Car",
          url: "https://playgama.com/export/game/eggy-car",
          description: "Балансируй яйцо...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/8a3ad863-645d-4055-8781-e8e1ecafd400/enlarged",
        },
        {
          title: "Sworded io - Spin and Rub",
          url: "https://playgama.com/export/game/sworded-io--spin-and-rub",
          description: "Аркадный бой...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/50fa6daf-9d39-4573-bd9f-cfadab649c00/enlarged",
        },
        {
          title: "Archer Ragdoll",
          url: "https://playgama.com/export/game/archery-ragdoll",
          description: "Физика стрел...",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/7857df6e-c7b3-48b9-1ffe-ed3bd8dfa100/enlarged",
        },
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
