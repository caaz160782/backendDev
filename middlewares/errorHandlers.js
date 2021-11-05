const logErrors = (err, req, res, next) => {
    console.log("Se ejecuto logErrors");
    console.error(err);
    next(err);
  };
  
  const errorHandler = (err, req, res, next) => {
    res.status(500).json({
      err,
    });
  };
  
  module.exports = { logErrors, errorHandler };