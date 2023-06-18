const { Router } = require("express");
const router = Router();

const categoryRoute = require("./category.route");
const descriptionRoute = require("./description.route");

router.use("/itInfo/category", categoryRoute);
router.use("/itInfo/description", descriptionRoute);

module.exports = router;