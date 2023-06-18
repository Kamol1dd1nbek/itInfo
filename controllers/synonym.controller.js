const { isValidObjectId } = require("mongoose");
const { messageSender: sender } = require("../helpers/messageSender");
const Synonym = require("../models/Synonym.model");

const getAllSynonyms = async (req, res) => {
    const syns = await Synonym.find({});

    if (!syns || syns.length == 0) {
        return sender(404, "Synonyms not found", res);
    }

    res.json(syns);
}

const getSynonymById = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return sender(404, "Invalid Id", res);
    }

    const foundSyn = await Synonym.findOne({_id: id});

    if (!foundSyn) {
        return sender(404, "Synonym not found", res);
    }

    res.json(foundSyn);
}

const addSynonym = async (req, res) => {
    const { descriptionId, dictionaryId} = req.body;

    if (!isValidObjectId(descriptionId) || !isValidObjectId(dictionaryId)) {
        return sender(404, "Dictionary or Description Id is invalid", res);
    }

    const newSynonym = Synonym({
        descriptionId,
        dictionaryId
    });

    await newSynonym.save();
    sender(201, "Synonym successfully created");
}

module.exports = {
    getAllSynonyms,
    getSynonymById,
}