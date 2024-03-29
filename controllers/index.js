module.exports = {
  ...require('./Kurs'),
  ...require('./Scrape'),
};

module.exports.error = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    err: {
      message: err.message || 'Something went wrong',
    }
  });
};
