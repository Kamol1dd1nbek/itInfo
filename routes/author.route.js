const { Router } = require("express");
const { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } = require("../controllers/author.controller");
const router = Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", addAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", removeAuthor);

module.exports = router