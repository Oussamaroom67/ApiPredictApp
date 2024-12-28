const express = require("express");
const router = express.Router();
const PredictController = require("../controllers/PredictController")

router.post("/",PredictController.getSymptomes);
module.exports=router;