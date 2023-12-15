var express = require("express");
var bcrypt = require("bcryptjs");
const router = express.Router();

const officeCtrl = require("../controllers/officeCtrl");

router.get("/transaction", officeCtrl.getOfficeTransaction);
router.get("/gathering", officeCtrl.getOfficeGathering);
router.get("/byID", officeCtrl.getOfficeByID);

router.post("/options", officeCtrl.getOption);

module.exports = router;