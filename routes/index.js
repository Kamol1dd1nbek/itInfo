const { Router } = require("express");
const router = Router();

const categoryRoute = require("./category.route");
const descriptionRoute = require("./description.route");
const dictionaryRoute = require("./dictionary.route");
const synonymRoute = require("./synonym.route");
const socialRoute = require("./social.route");
const authorRoute = require("./author.route");

router.use("/itInfo/category", categoryRoute);
router.use("/itInfo/description", descriptionRoute);
router.use("/itInfo/dictionary", dictionaryRoute);
router.use("/itInfo/synonym", synonymRoute);
router.use("/itInfo/social", socialRoute);
router.use("/itInfo/author", authorRoute);

module.exports = router;