'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('foundations', [
      {
        name: 'Foundation 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496090588-1729498310715-cfbc.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496100383-1729498323489-charityFirst.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496105726-1729498327124-cibak.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496109872-1729498330361-dost.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496113785-1729498333561-green.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496117374-1729498336515-L.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496121024-1729498339244-lcck.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496125623-1729498341884-megaworld.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foundation 9',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat, lacus at venenatis cursus, odio urna vehicula metus, sed dapibus nunc nulla nec nunc. Integer sit amet elit sit amet sapien fermentum accumsan. Donec pharetra felis nec nulla tincidunt, a dictum nunc posuere. Vivamus non tincidunt lacus. Praesent vehicula, sapien nec sagittis elementum, augue lectus suscipit dolor, nec egestas urna nisl vel libero. Curabitur gravida quam a eros tincidunt, nec lacinia libero euismod. Nulla facilisi. In auctor nisl in urna sodales, ac fringilla neque luctus.',
        logo_path: '/foundations/1731496128671-1729498345415-sm.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foundations', null, {});
  }
};
