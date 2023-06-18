const { Router } = require("express");
const router = Router();

const categoryRoute = require("./category.route");
const descriptionRoute = require("./description.route");
const dictionaryRoute = require("./dictionary.route");

router.use("/itInfo/category", categoryRoute);
router.use("/itInfo/description", descriptionRoute);
router.use("/itInfo/dictionary", dictionaryRoute);

module.exports = router;