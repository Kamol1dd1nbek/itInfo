const { Router } = require("express");
const { getDescriptionById, getAllDescriptions, addDescription, updateDescription, removeDescription } = require("../controllers/description.controller");
const router = Router();

router.get("/", getAllDescriptions);
router.get("/:id", getDescriptionById);
router.post("/", addDescription);
router.put("/:id", updateDescription);
router.delete("/:id", removeDescription);

module.exports = router;