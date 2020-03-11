'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('establishments',
      'latitude', {
      type: Sequelize.STRING,
      allowNull: true
    }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('establishments', 'latitude');
  }
};
