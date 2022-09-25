const registerservice = require("../service/registerservice");

function addUser(req, res) {
  registerservice
    .addUserAsync(req.body)
    .then(function (result) {
      if (result == 1) {
        return res.resultvalue({}, "Register successful", 200);
      } else if (result == 0) {
        return res.resultvalue({}, "Email exists already", 400);
      }
      res.resultvalue({}, "Register failed ", 400);
    })
    .catch(function (err) {
      res.resultvalue({}, err, 400);
    });
}

module.exports = {
  addUser,
};
