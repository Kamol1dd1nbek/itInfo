const { isValidObjectId } = require("mongoose");
const Description = require("../models/Description.model");
const { descriptionValidation } = require("../validations/description.validation");

const getAllDescriptions = async (req, res) => {
    try {
        const descriptions = await Description.find({});

        if (!descriptions || descriptions.length == 0) {
            return res.status(200).send({message: "Descriptions not found"});
        }

        res.json(descriptions);
    } catch (error) {
        console.log(error);
    }
}

const getDescriptionById = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const foundDescription = await Description.findOne({_id: id});

    if (!foundDescription) {
        return res.status(404).send({message: "Description not found"});
    }

    res.json(foundDescription);
}

const addDescription = async (req, res) => {

    const { error, value } = await descriptionValidation(req.body);

    if (error) {
        return res.status(404).send({message: error.details[0].message});
    }

    const { categoryId, description } = value;

    if (!isValidObjectId(categoryId)) {
        return res.status(404).send({message: "Category Id is invalid"});
    }

    const newDescription = await Description({
        categoryId,
        description
    });

    await newDescription.save();
    res.status(201).send({message: "description successfully added"});
}

const updateDescription = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const { error, value } = await descriptionValidation(req.body);

    if (error) {
        return res.status(404).send({message: error.details[0].message});
    }

    const { categoryId, description } = value;

    if(!isValidObjectId(categoryId)) {
        return res.status(404).send({message: "Invalid Category Id"})
    }

    const foundDescription = await Description.findOne({_id: id});

    if (!foundDescription) {
        return res.status(404).send({message: "Description not found"});
    }

    foundDescription.categoryId = categoryId;
    foundDescription.description = description;

    await foundDescription.save();
    res.status(200).send({message: "Description successfully updated"});
}

const removeDescription = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const foundDescription = await Description.findOne({_id: id});

    if (!foundDescription) {
        return res.status(404).send({message: "Description not found"});
    }

    await Description.deleteOne({_id: id});

    res.status(200).send({message: "Description seccussfully deleted"});
}

module.exports = {
    getAllDescriptions,
    getDescriptionById,
    addDescription,
    updateDescription,
    removeDescription,
}