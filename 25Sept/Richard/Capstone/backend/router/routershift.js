var express = require("express");
var shiftcontroller = require("../controller/shiftcontroller");
var router = express.Router();

router.post("/addshift", shiftcontroller.addShift);
router.post("/deleteshift", shiftcontroller.deleteShift);
router.post("/getshift", shiftcontroller.getShift);

module.exports = router;
