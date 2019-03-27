const models = require('../models');
const Sequelize = require('sequelize');

exports.deleteKurs = (req, res, next) => {
  return models.Kurs.destroy({
      where: {
        date: req.params.date
      }
    })
    .then(kurs => {
      return res.status(202).json(kurs);
    })
    .catch((error) => {
      return next({
        status: 400,
        message: error.message,
      });
    });
};

exports.getKurs = (req, res, next) => {
  const Op = Sequelize.Op;

  return models.Kurs.findAll({
      where: {
        date: {
          [Op.between]: [req.query.startdate, req.query.enddate]
        }
      },
    })
    .then(kurs => {
      return res.status(200).json(kurs);
    })
    .catch(reason => {
      return res.status(404).json(`Data not found`);
    })
    .catch((error) => {
      return next({
        status: 400,
        message: error.message,
      });
    });
};

exports.getKursSymbol = (req, res, next) => {
  const Op = Sequelize.Op;

  return models.Kurs.findAll({
      where: {
        [Op.and]: [
          {
            date: {
              [Op.between]: [req.query.startdate, req.query.enddate]
            }
          },
          {
            symbol: req.params.symbol
          }
        ]
      },
    })
    .then(kurs => {
      return res.status(200).json(kurs);
    })
    .catch((error) => {
      return next({
        status: 400,
        message: error.message,
      });
    });
};

exports.createKurs = (req, res, next) => {
  return models.Kurs.findOrCreate({
      where: {
        symbol: req.body.symbol,
        erate_jual: req.body.e_rate.jual,
        erate_beli: req.body.e_rate.beli,
        ttcounter_jual: req.body.tt_counter.jual,
        ttcounter_beli: req.body.tt_counter.beli,
        banknotes_jual: req.body.bank_notes.jual,
        banknotes_beli: req.body.bank_notes.beli,
        date: req.body.date,
      },
      defaults: req.body
    })
    .then(([kurs, created]) => {
      return res.status(200).json([kurs, created]);
    })
    .catch((error) => {
      return next({
        status: 400,
        message: error.message,
      });
    });
};

exports.updateKurs = (req, res) => {
  return models.Kurs.findOne({
      where: {
        symbol: req.body.symbol,
        date: req.body.date,
      }
    })
    .then(kurs => {
      return kurs
        .update({
          erate_jual: req.body.e_rate.jual,
          erate_beli: req.body.e_rate.beli,
          ttcounter_jual: req.body.tt_counter.jual,
          ttcounter_beli: req.body.tt_counter.beli,
          banknotes_jual: req.body.bank_notes.jual,
          banknotes_beli: req.body.bank_notes.beli,
        })
        .then(updatedKurs => {
          return res.status(202).json([updatedKurs,`Kurs has been successfully updated`]);
        })
        .catch(reason => {
          return res.status(403).json(`Update failed`);
        });
    })
    .catch(reason => {
      return res.status(404).json(`Data not found`);
    });
};
