const { Router } =require("express");
const { getAllSynonyms } = require("../controllers/synonym.controller");
const router = Router();

router.get("/", getAllSynonyms);

module.exports = router;