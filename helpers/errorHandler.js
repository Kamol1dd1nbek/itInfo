const chalk = require("chalk");
exports.errorHandler = (err, res) => {
    console.log(chalk.bgRed("Error: "), err);
}