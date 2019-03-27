const router = require('express').Router();
const control = require('../controllers');

router.get('/', control.scrapeKurs);

module.exports = router;
