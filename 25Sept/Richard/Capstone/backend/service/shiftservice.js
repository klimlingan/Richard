const { db } = require("../database/mysqldb.js");

var addShift = function (req, res) {
  let dts = new Date(req.body.shift_date.replace(/-/g, "/"));
  let starttime = `${dts.getFullYear()}-${
    dts.getMonth() + 1
  }-${dts.getDate()} ${req.body.start_time}:00`;
  let endtime = `${dts.getFullYear()}-${dts.getMonth() + 1}-${dts.getDate()} ${
    req.body.end_time
  }:00`;

  let sql = "select * from shift where start_time=? and end_time=? limit 1";
  db.query(sql, [starttime, endtime], (err, result) => {
    if (err) {
      return res.resultvalue([], "Add shift failed!", 400);
    }
    if (result.length > 0) {
      res.resultvalue(
        [],
        "This period has been taken up. Please select another date and shift",
        400
      );
      return;
    }
    let sql =
      "insert into shift(shift_date,start_time,end_time,user_id) values (?,?,?,?)";
      console.log(sql);
    db.query(sql, [dts, starttime, endtime, req.auth.Id], (err, result) => {
      if (err) {
        return res.resultvalue([], err, 400);
      }
      res.resultvalue([], "Add shift successful!", 200);
    });
  });
};

var deleteShift = function (req, res) {
   console.log("delete shift shiftservice")
  let dts = new Date(req.body.shift_date.replace(/-/g, "/"));
  let starttime = `${dts.getFullYear()}-${
    dts.getMonth() + 1
  }-${dts.getDate()} ${req.body.start_time}:00`;
  let endtime = `${dts.getFullYear()}-${dts.getMonth() + 1}-${dts.getDate()} ${
    req.body.end_time
  }:00`;

  let sql = "select * from shift where start_time=? and end_time=? limit 1";
  db.query(sql, [starttime, endtime], (err, result) => {
    if (err) {
      return res.resultvalue([], "Delete shift failed!", 400);
    }
    if (result.length == 0) {
      res.resultvalue(
        [],
        "This period is already empty.",
        400
      );
      return;
    }

    let sql =
      "delete from shift where start_time=? and end_time=? limit 1";
   console.log(sql);
    db.query(sql, [starttime, endtime], (err, result) => {
      if (err) {
        return res.resultvalue([], err, 400);
      }
      console.log("delete successful");
      res.resultvalue([], "Delete shift successful!", 200);
    });
  });
};


var getShift = function (req, res) {
  let dts = new Date(req.body.shift_date.replace(/-/g, "/"));
  // week from today
  let dtsWeek = new Date(dts.getTime() + 7 * 24 * 60 * 60 * 1000);

  let startDate = `${dts.getFullYear()}-${dts.getMonth() + 1}-${dts.getDate()}`;
  let endDate = `${dtsWeek.getFullYear()}-${
    dtsWeek.getMonth() + 1
  }-${dtsWeek.getDate()}`;
  // get shift from today to 7 days later then replace user_id with user name
  let sql = `select s.id,s.shift_date,s.start_time,s.end_time,u.first_name,u.last_name from shift s left join user u on s.user_id=u.id where s.shift_date between ? and ?`;

  db.query(sql, [startDate, endDate], (err, result) => {
    if (err) {
      return res.resultvalue([], err, 400);
    }
    res.resultvalue(result, "Success", 200);
  });
};

module.exports = {
  addShift,
  deleteShift,
  getShift,
};
