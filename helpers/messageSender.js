exports.messageSender = (status, message, res) => {
    res.status(status).send({message});
}