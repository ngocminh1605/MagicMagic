var express = require("express");
var bcrypt = require("bcryptjs");
const router = express.Router();

const transferCtrl = require("../controllers/transferCtrl");


router.post("/confirmReceive", transferCtrl.confirmReceive);
router.post("/sendAndWait", transferCtrl.SendAndWaitOrder);
router.post("/updateReceive", transferCtrl.updateReceive);

router.post("/getTransfer", transferCtrl.getTransferOrder);

module.exports = router;