const { db } = require("../database/mysqldb.js");
var getUserbyNamePwdAsync = function (email, password) {
  return new Promise(function (resolve, reject) {
    let sql = "SELECT * FROM user where email=? and password=?";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
module.exports={
    getUserbyNamePwdAsync
}