const errorhandling = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.resultvalue([], "Authentication failed", 401);
  }
  res.resultvalue([], err, 401);
};

module.exports = {
  errorhandling,
};
