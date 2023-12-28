var express = require("express");
const router = express.Router();

const tkeCtrl = require("../controllers/thongkeCtrl");


router.post("/all", tkeCtrl.getAll);

router.post("/byMonth", tkeCtrl.byMonth);

router.post("/GD", tkeCtrl.GDOffice);
router.post("/TK", tkeCtrl.TKOffice);

router.post("/office", tkeCtrl.numOffice);
router.post("/employee", tkeCtrl.numEmployee);

module.exports = router;