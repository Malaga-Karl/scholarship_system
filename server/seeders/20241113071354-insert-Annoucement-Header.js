'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserting sample data into the 'announcement_headers' table
    await queryInterface.bulkInsert('announcementheaders', [
      {
        title: 'New Feature Release',
        description: 'We have just released a major update to improve performance and add new features.',
        cover_path: '/announcements/new_feature.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Scheduled Maintenance',
        description: 'Our platform will be down for scheduled maintenance on 15th November from 12 AM to 4 AM.',
        cover_path: '/announcements/maintenance.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Holiday Announcement',
        description: 'Our offices will be closed for the holidays from 24th December to 1st January.',
        cover_path: '/announcements/holiday.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bossing! kumusta ang buhay-buhay?',
        description: 'How is life indeed? are you having a wonderful life?',
        cover_path: '/announcements/bossing.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Deleting all records from the 'announcement_headers' table
    await queryInterface.bulkDelete('announcementheaders', null, {});
  }
};
