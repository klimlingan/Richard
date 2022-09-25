const commonresult = (req, res, next) => {
  res.resultvalue = function (data, message, status = 200) {
    res.status(status).json({
      status,
      data,
      message: message instanceof Error ? message.message : message,
    });
  };
  next();
};

module.exports = {
  commonresult,
};
