'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert Foundations
    await queryInterface.bulkInsert('Foundations', [
      {
        name: 'Tech Foundation',
        description: 'A foundation supporting tech-related scholarships.',
        logo_path: '/foundations/1731496100383-1729498323489-charityFirst.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Health Foundation',
        description: 'Focused on scholarships for healthcare fields.',
        logo_path: '/foundations/1731496090588-1729498310715-cfbc.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Retrieve foundation IDs to use in scholarships
    const foundations = await queryInterface.sequelize.query(
      `SELECT foundation_id, name FROM Foundations WHERE name IN ('Tech Foundation', 'Health Foundation');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Map foundation names to IDs
    const foundationMap = {};
    foundations.forEach(foundation => {
      foundationMap[foundation.name] = foundation.foundation_id;
    });

    // Insert Scholarships using the retrieved foundation IDs
    await queryInterface.bulkInsert('Scholarships', [
      {
        foundation_id: foundationMap['Tech Foundation'], // Associate with Tech Foundation
        title: 'Tech Leaders Scholarship',
        slots: 10,
        deadline: new Date('2024-12-31'),
        scholarship_description: 'Supporting future leaders in technology.',
        eligibility: 'Minimum GPA of 3.5,Final year students',
        reqs: 'Resume,Letter of Recommendation,Essay',
        benefits: '$5000 stipend,Networking opportunities',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        foundation_id: foundationMap['Health Foundation'], // Associate with Health Foundation
        title: 'Healthcare Heroes Scholarship',
        slots: 5,
        deadline: new Date('2024-06-30'),
        scholarship_description: 'Scholarship for students in healthcare fields.',
        eligibility: 'Minimum GPA of 3.0,Enrolled in a healthcare program',
        reqs: 'Transcript of records,Letter from Dean,Essay',
        benefits: '$3000 grant,Medical supplies support',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Scholarships', null, {});
    await queryInterface.bulkDelete('Foundations', null, {});
  },
};
