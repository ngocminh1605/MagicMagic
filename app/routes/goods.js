var express = require("express");
const router = express.Router();

const goodCtrl = require("../controllers/goodCtrl");

router.post("/order", goodCtrl.createOrder);

router.get("/getAll", goodCtrl.getAll);
router.get("/getWait", goodCtrl.getStateWait);
router.get("/getReturn", goodCtrl.getStateReturn);

router.get("/getSendAll", goodCtrl.getSendAll);
router.get("/getSendByOffice", goodCtrl.getSendByOffice);

router.get("/getReceiveAll", goodCtrl.getReceiveAll);
router.get("/getReceiveByOffice", goodCtrl.getReceiveByOffice);

router.post("/infoOrder", goodCtrl.getInfoOrder);

router.post("/checkExist", goodCtrl.checkQRExist);
router.post("/stateInfo", goodCtrl.getStateOrder);

router.post("/updateGood", goodCtrl.updateGood);

module.exports = router;