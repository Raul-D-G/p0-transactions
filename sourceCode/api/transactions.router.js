const { checkToken } = require("./middlewares/token_validation");

const {
  createTranzactie,
  deleteTranzactie,
  getTranzactiiByExpeditorId,
} = require("./transactions.controller");

const router = require("express").Router();

router.post("/", checkToken, createTranzactie);
router.delete("/:id", checkToken, deleteTranzactie);
router.get("/:id", checkToken, getTranzactiiByExpeditorId);

module.exports = router;
