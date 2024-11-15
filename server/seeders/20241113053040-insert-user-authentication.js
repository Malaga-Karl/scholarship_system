'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insert sample UserAuthentication data
    const userAuths = await queryInterface.bulkInsert('UserAuthentications', [
      {
        user_id: '202101310',
        email: 'chas@gmail.com',
        password_hash: '$2b$12$1PK9iqCpDDL1vrtU4JLa0.PqpSD82g9ldl51wsyTh63YUj.UinYLi',
        failed_login_attempts: 0,
        account_locked: false,
        password_reset_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true }); // Ensures you return the inserted records for the next step

    // Insert sample UserProfile data, using user_id from UserAuthentication
    await queryInterface.bulkInsert('UserProfiles', [
      {
        user_id: '202101310',
        first_name: 'Robert',
        last_name: 'Conchas',
        phone_number: '09202672998',
        gender: 'M',
        profile_picture_url: '/profiles/conchas_profile.jpg',
        notification_settings: 'Y',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, {});
    await queryInterface.bulkDelete('UserAuthentications', null, {});
  }
};
