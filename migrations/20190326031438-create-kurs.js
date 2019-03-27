'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Kurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      symbol: {
        type: Sequelize.STRING
      },
      erate_jual: {
        type: Sequelize.STRING
      },
      erate_beli: {
        type: Sequelize.STRING
      },
      ttcounter_jual: {
        type: Sequelize.STRING
      },
      ttcounter_beli: {
        type: Sequelize.STRING
      },
      banknotes_jual: {
        type: Sequelize.STRING
      },
      banknotes_beli: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Kurs');
  }
};
