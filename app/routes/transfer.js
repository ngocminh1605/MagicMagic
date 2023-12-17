var express = require("express");
var bcrypt = require("bcryptjs");
const router = express.Router();

const transferCtrl = require("../controllers/transferCtrl");


router.post("/confirmReceive", transferCtrl.confirmReceive);
router.post("/sendAndWait", transferCtrl.SendAndWaitOrder);
router.post("/updateReceive", transferCtrl.updateReceive);

router.post("/getTransfer", transferCtrl.getTransferOrder);
router.post("/getWaitConfirm", transferCtrl.getGoodWaitConfirm);

router.post("/receiveSuccess", transferCtrl.confirmSuccess);
router.post("/receiveFail", transferCtrl.confirmFail);

router.post("/checkTransfer", transferCtrl.getByIDandOffice)

module.exports = router;