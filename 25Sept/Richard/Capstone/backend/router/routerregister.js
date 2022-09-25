var express=require("express");
var registercontroller=require("../controller/registercontroller");
var router=express.Router();

router.post('/register',registercontroller.addUser);

module.exports=router;