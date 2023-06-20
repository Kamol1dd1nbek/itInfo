const ApiError = require("../error/ApiError");

module.exports = function(err, req, res, next) {
    if (err instanceof ApiError) return res.status(err.status).send({message: err.message});
    if (err.message.includes("Unexpected string in JSON")) return res.status(err.status).send({message: err.message});
    if (err instanceof SyntaxError) return res.status(err.status).send({message: err.message});
    res.status(500).send({message: "unintended error"});
}