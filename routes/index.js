const { Router } = require("express");
const router = Router();

const categoryRoute = require("./category.route");

router.use("/itInfo/category", categoryRoute);

module.exports = router;