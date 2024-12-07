'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Insert seed data into ScholarshipStatuses table
        await queryInterface.bulkInsert('ScholarshipStatus', [
            {
                status_id: 1, 
                name: 'No Scholarship',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status_id: 2, 
                name: 'Pending Scholarship',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status_id: 3, 
                name: 'Rejected Scholarship',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status_id: 4, 
                name: 'Accepted Scholarship',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status_id: 5, 
                name: 'Submitted Scholarship',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remove all seed data from ScholarshipStatuses table
        await queryInterface.bulkDelete('ScholarshipStatus', null, {});
    }
};
