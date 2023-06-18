const { Router } = require("express");
const { getAllDictionaries, getDictionaryById, addDictionary, updateDictionary, removeDictionary, getDictionaryByLetterAndTrem } = require("../controllers/dictionary.controller");
const router = Router();

router.get("/", getAllDictionaries);
router.get("/terms", getDictionaryByLetterAndTrem);
router.get("/:id", getDictionaryById);
router.post("/", addDictionary);
router.put("/:id", updateDictionary);
router.delete("/:id", removeDictionary);

module.exports = router;