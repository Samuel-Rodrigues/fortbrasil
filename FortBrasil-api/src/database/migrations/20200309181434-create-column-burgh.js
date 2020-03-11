'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('establishments',
      'burgh',
      { type: Sequelize.STRING });
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('establishments', 'burgh');
  }
};
