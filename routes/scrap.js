const router = require('express').Router();
const control = require('../controllers');

router.get('/', control.scrapKurs);

module.exports = router;
