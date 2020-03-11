'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('establishments',
      'longitude', {
      type: Sequelize.STRING,
      allowNull: true
    }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('establishments', 'longitude');
  }
};
