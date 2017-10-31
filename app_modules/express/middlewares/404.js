// catch 404 and forward to error handler
module.exports = function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
};
