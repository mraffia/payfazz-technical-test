'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kurs = sequelize.define('Kurs', {
    symbol: DataTypes.STRING,
    erate_jual: DataTypes.STRING,
    erate_beli: DataTypes.STRING,
    ttcounter_jual: DataTypes.STRING,
    ttcounter_beli: DataTypes.STRING,
    banknotes_jual: DataTypes.STRING,
    banknotes_beli: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {});
  Kurs.associate = function(models) {
    // associations can be defined here
  };
  return Kurs;
};