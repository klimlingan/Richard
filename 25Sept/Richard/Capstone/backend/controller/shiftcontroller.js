const shiftservice= require("../service/shiftservice");
function addShift(req, res) {
    shiftservice.addShift(req,res);
}

function deleteShift(req, res) {
   console.log("delete shift")
    shiftservice.deleteShift(req,res);
}

function getShift(req, res) {
    shiftservice.getShift(req,res);
}
module.exports = {
    addShift,
    deleteShift,
    getShift
};
