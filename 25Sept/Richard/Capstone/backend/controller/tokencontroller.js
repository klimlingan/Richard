const userservice = require("../service/tokenservice");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");

function tokentest(req, res) {
  res.resultvalue("This is test for authentication", "Send success");
}

function tokengenerator(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  userservice
    .getUserbyNamePwdAsync(email, password)
    .then(function (result) {
      if (result.length > 0) {
        let obj = {
          Id: result[0].Id,
        };
        let tokenStr = jwt.sign(obj, jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn,
        });
        let name = result[0].first_name;
        res.resultvalue({ token: tokenStr, name }, "Token success", 200);
      } else {
        res.resultvalue("", "Email or password wrong", 400);
      }
    })
    .catch(function (err) {
      res.resultvalue([], err, 400);
    });
}

module.exports = {
  tokentest,
  tokengenerator,
};
