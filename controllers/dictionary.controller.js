const { isValidObjectId } = require("mongoose");
const { messageSender : sender}  = require("../helpers/messageSender");
const Dictionary = require("../models/Dictionary.model");

const getAllDictionaries = async (req, res) => {
    try {
        const dicts = await Dictionary.find({});

        if (!dicts || dicts.length == 0) {
            return sender(404, "Dictionaries not found", res);
        }

        res.json(dicts);
    } catch (error) {
        console.log(error);
    }
}

const getDictionaryById = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return sender(404, "Invalid Id", res);
    }

    const foundDictionary = await Dictionary.findOne({_id: id});

    if (!foundDictionary) {
        return sender(404, "Dictionary not found", res);
    }

    res.json(foundDictionary);
}

const addDictionary = async (req, res) => {
    try {
        const { term } = req.body;
    
        const newDictionary = await Dictionary({
            term,
            letter: term[0],
        });
    
        await newDictionary.save();
        res.status(201).send({message: "Dictionary successfully added"});
    } catch (error) {
        console.log(error);
    }
}

const updateDictionary = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const { term } = req.body;

    const foundDictionary = await Dictionary.findOne({_id: id});

    if (!foundDictionary) {
        return res.status(404).send({message: "Dictionary not found"});
    }

    foundDictionary.term = term;
    foundDictionary.letter = term[0];

    await foundDictionary.save();
    res.status(200).send({message: "Dictionary successfully updated"});
}

const removeDictionary = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const foundDictionary = await Dictionary.findOne({_id: id});

    if (!foundDictionary) {
        return res.status(404).send({message: "Dictionary not found"});
    }

    await Dictionary.deleteOne({_id: id});

    res.status(200).send({message: "Dictionary seccussfully deleted"});
}

const getDictionaryByLetterAndTrem = async (req, res) => {
    let letter = req.query.letter;
    let term = req.query.term;
    if (!letter && !term) {
        return sender(404, "Queries not found", res);
    }
    let foundDictionaryies;
    if (term) 
        foundDictionaryies = await Dictionary.find({term: {$regex: term, $options: "i"}});
    
    if (letter) {
        letter = letter[0];
        foundDictionaryies = await Dictionary.find({letter: {$regex: letter, $options: "i"}});
    }
        
    if (!foundDictionaryies || foundDictionaryies.length == 0) {
        return sender(404, "No result", res)
    }

    res.json(foundDictionaryies);
}

const getDictionaryByTerm = async (req, res) => {
    
}

module.exports = {
    getAllDictionaries,
    getDictionaryById,
    addDictionary,
    updateDictionary,
    removeDictionary,
    getDictionaryByLetterAndTrem
}