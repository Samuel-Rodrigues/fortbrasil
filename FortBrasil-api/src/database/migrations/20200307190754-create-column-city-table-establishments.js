'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('establishments',
      'city', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('establishments', 'city');
  }
};
