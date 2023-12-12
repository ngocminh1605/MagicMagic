var express = require("express");
var bcrypt = require("bcryptjs");
const router = express.Router();

const goodCtrl = require("../controllers/goodCtrl");


router.post("/order", goodCtrl.createOrder);

router.get("/getAll", goodCtrl.getAll);

router.get("/getSendAll", goodCtrl.getSendAll);
router.get("/getSendByOffice", goodCtrl.getSendByOffice);

router.get("/getReceiveAll", goodCtrl.getReceiveAll);
router.get("/getReceiveByOffice", goodCtrl.getReceiveByOffice);

router.post("/infoOrder", goodCtrl.getInfoOrder);

module.exports = router;