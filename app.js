const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const chalk = require("chalk");
const log = console.log;
const app = express();

const mainRoute = require("./routes");


app.use(express.json());

app.use(mainRoute);


async function start() {
    try {
        await mongoose.connect(config.get("dbUri"));
        const PORT = config.get("port") || 3030;
        app.listen(PORT, () => {
            log(chalk.bgGreen(chalk.black(` Server is running on port: ${PORT} `)));

        })
    } catch (error) {
        log(chalk.bgRed("Serverda xatolik >>> "), error);
    }
}
start();