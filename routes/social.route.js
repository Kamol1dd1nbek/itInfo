const { Router } = require("express");
const { getAllSocials, getSocialById, addSocial, removeSocial, updateSocial } = require("../controllers/social.controller");
const router = Router();

router.get("/", getAllSocials);
router.get("/:id", getSocialById);
router.post("/", addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", removeSocial);

module.exports = router;