const { isValidObjectId } = require("mongoose");
const Social = require("../models/Social.model");

const getAllSocials = async (req, res) => {
    const socials = await Social.find({});

    if (socials.length == 0) {
        return res.status(404).send({message: "Socials not found"});
    }

    res.json(socials);
}

const getSocialById = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        res.status(404).send({message: "Invalid Id"});
    }

    const social = await Social.findOne({_id: id});

    if (!social) {
        return res.status(404).send({message: "Social not found"});
    }

    res.json(social);
}

const addSocial = async (req, res) => {
    const {socialName, socialIconFile} = req.body;

    const foundSocial = await Social.findOne({socialName});

    if (foundSocial) {
        return res.status(404).send({message: "The social network of this name has already been added"});
    }

    const newSocial = await Social({socialName, socialIconFile});

    await newSocial.save();
    res.status(200).send({message: "Social successfully created"});
}

const updateSocial = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(404).send({messgae: "Invalid Id"});
    }

    const foundSocial =  await Social.findOne({_id: id});

    if (!foundSocial) {
        return res.status(404).send({message: "Social not found"});
    }
    const {socialName, socialIconFile} = req.body;
    foundSocial.socialName = socialName;
    foundSocial.socialIconFile = socialIconFile || "social.png";
    await foundSocial.save();
    res.status(200).send({message: "Successfully updated"});
}

const removeSocial = async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(404).send({message: "Invalid Id"});
    }

    await Social.deleteOne({_id: id});
    res.status(200).send({message: "Successfully deleted"});
}

module.exports = {
    getAllSocials,
    getSocialById,
    addSocial,
    updateSocial,
    removeSocial,
}