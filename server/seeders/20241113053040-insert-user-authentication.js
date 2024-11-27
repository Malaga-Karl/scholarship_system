'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample UserAuthentication data
    const userAuths = await queryInterface.bulkInsert(
      'UserAuthentications',
      [
        {
          user_id: '202101310',
          email: 'chas@gmail.com',
          password_hash:
            '$2b$12$1PK9iqCpDDL1vrtU4JLa0.PqpSD82g9ldl51wsyTh63YUj.UinYLi',
          failed_login_attempts: 0,
          account_locked: false,
          password_reset_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: '202100000',
          email: 'chas1@gmail.com', // Make sure this is unique
          password_hash:
            '$2b$12$1PK9iqCpDDL1vrtU4JLa0.PqpSD82g9ldl51wsyTh63YUj.UinYLi',
          failed_login_attempts: 0,
          account_locked: false,
          password_reset_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    // Insert sample UserProfile data, using user_id from UserAuthentication
    await queryInterface.bulkInsert('UserProfiles', [
      {
        user_id: '202101310',
        first_name: 'Robert',
        last_name: 'Conchas',
        middle_name: 'Chavarria',
        phone_number: '09202672998',
        gender: 'M',
        profile_picture_url: '/profiles/conchas_profile.jpg',
        notification_settings: 'Y',
        course: 'BS-Computer Science',
        department: 'CISTM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '202100000',
        first_name: 'NotRobert',
        last_name: 'NotConchas',
        middle_name: 'NotChavarria',
        phone_number: '09202672998',
        gender: 'M',
        profile_picture_url: '/profiles/not_conchas_profile.jpg',
        notification_settings: 'Y',
        course: 'BS-Computer Science',
        department: 'CISTM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete rows in reverse order to respect foreign key constraints
    await queryInterface.bulkDelete('UserProfiles', null, {});
    await queryInterface.bulkDelete('UserAuthentications', null, {});
  },
};
