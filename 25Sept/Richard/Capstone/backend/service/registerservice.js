const { db } = require("../database/mysqldb.js");

var addUserAsync = function (body) {

  return new Promise(function (resolve, reject) {
    let sqlquery = "select * from user where email=? limit 1";
    db.query(sqlquery, body.email, (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      if (result.length > 0) {
        resolve(0);
      } else {
        let sql =
          "insert into user(first_name,last_name,password,email,contact_number) values (?,?,?,?,?)";
        db.query(
          sql,
          [
            body.first_name,
            body.last_name,
            body.password,
            body.email,
            body.contact_number,
          ],
          (err, result) => {
            if (err) {
              console.log(err.message);
              reject(err);
              return;
            }
            resolve(1);
          }
        );
      }
    });
  });
};

module.exports = {
  addUserAsync,
};
