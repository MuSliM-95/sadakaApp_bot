'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('games', [
        {
          title: "RIVALS FPS: Online Shooter",
          url: "https://playgama.com/export/game/rivals-fps-online-shooter?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
          description:
            `💥Добро пожаловать в мир "RIVALS FPS: Online Shooter" — нового бесплатного многопользовательского онлайн-шутера, где вас ждут захватывающие сражения, крутое оружие и настоящая арена сражений! 🎮 Игра вдохновлена ​​такими топовыми шутерами, как Star Wars Battlefront и Battlefield. Здесь вы можете погрузиться в динамичные онлайн-сражения, объединиться с друзьями и продемонстрировать свои навыки стрельбы на арене. ⚙️ Особенности: - Онлайн-мультиплеер с друзьями - Шутер от первого лица - Яркая 3D-графика в красочном стиле - Множество интересных карт - Различные игровые режимы и таблицы лидеров - Играйте бесплатно прямо в браузере с вашего мобильного телефона или компьютера. Сражайтесь, улучшайте, меняйте оружие и получайте награды в эпических онлайн-битвах!`,
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/aafa168c-5dd8-417e-2cde-f2e431aaeb00/w=800,fit=cover",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Block Blast",
          url: "https://playgama.com/export/game/block-blast-master?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
          description: "Собирай блоки и решай головоломки в Block Blast.",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/7276cce0-625e-4479-0bae-7612a4ae0c00/w=800,fit=cover",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Plants vs Zombies Fusion Mode",
          url: "https://playgama.com/export/game/plants-vs-zombies-fusion-mode?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
          description:
            "Добро пожаловать в обновлённый мир Plants vs. Zombies, где инновации переплетаются с традициями! В этой игре у вас есть возможность не только защищать свой дом от зомби с помощью армии растений, но и создавать уникальные гибридные растения, сочетающие в себе способности двух или более оригинальных растений. Эти гибриды предоставляют вам неограниченные тактические возможности для борьбы с новыми волнами зомби, которые стали умнее, сильнее и хитрее!",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/5a3c984d-4edd-4bf1-aebf-cf0e63e5c700/w=800,fit=cover",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Age of Tanks Warriors: TD War",
          url: "https://playgama.com/export/game/age-of-tanks-warriors-td-war?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
          description:
            "Ведите своих танковых воинов к славе сквозь века! Добро пожаловать в Age of Tank Warriors: TD War, лучшую стратегическую игру про танковые сражения! Путешествуйте по эпохам войн, ведя свою танковую армию от воинов каменного века до научно-фантастического космического будущего. Улучшайте свои боевые танки, участвуйте в напряженных сражениях Clash of Tank Warriors и используйте стратегию защиты башен (TD), чтобы покорить каждую эпоху. Вас ждут сражения на выживание 100 на 100 — сможете ли вы переписать историю и стать величайшим танковым военачальником?",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/135c7e32-e800-4a05-9ea1-e40cae1ec400/w=800,fit=cover",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Tile Farm Story",
          url: "https://playgama.com/export/game/tile-farm-story?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
          description:
            "Отправляйтесь в захватывающее приключение в Tile Farm Story, бесплатной онлайн-игре в жанре «три в ряд» с участием отважных сестер Стоун. Исследуйте уникальные локации, решайте головоломки и раскрывайте семейные тайны. Наслаждайтесь этой игрой в стиле маджонга на своем телефоне или компьютере, которая сочетает в себе увлекательные испытания и развлечения.",
          img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/b3e8d7fc-f50f-4658-f90e-4a432541a600/w=800,fit=cover",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
