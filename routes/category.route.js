const { Router } = require("express");
const { getAllcategories, getCategoryById, updateCategory, removeCategory, addCategory } = require("../controllers/category.controller");
const router = Router();

router.get("/", getAllcategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", removeCategory);

module.exports = router;