const router = require('express').Router();
const control = require('../controllers');

router
  .route('/:date')
  .delete(control.deleteKurs);

router
  .route('/')
  .get(control.getKurs)
  .post(control.createKurs)
  .put(control.updateKurs);

router
  .route('/:symbol')
  .get(control.getKursSymbol);

module.exports = router;
