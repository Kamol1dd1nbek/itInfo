const { Router } =require("express");
const { getAllSynonyms, getSynonymById, addSynonym, updateSynonym, removeSynonym } = require("../controllers/synonym.controller");
const router = Router();

router.get("/", getAllSynonyms);
router.get("/:id", getSynonymById);
router.post("/", addSynonym);
router.put("/:id", updateSynonym);
router.delete("/:id", removeSynonym);

module.exports = router;