const { isValidObjectId } = require("mongoose");
const Author = require("../models/Author.model");
const { authorValidation } = require("../validations/author.validation");
const bcrypt = require('bcrypt');

const getAllAuthors = async (req, res) => {
    const authors = await Author.find({});

    if (authors.length == 0){
        return res.status(200).send({message: "Authors not found"});
    }
    res.json(authors);
}

const getAuthorById = async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(404).send({message: "Invalid Id"});
    }

    const author = await Author.findOne({_id: id});

    if (!author) {
        return res.status(404).send({message: "Author not found"});
    }

    res.json(author);
}

const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);

        if (error) {
            return res.status(404).send({message: error.details[0].message});
        }

        const {
            firstName,
            lastName,
            nickName,
            email,
            phone,
            password,
            info,
            position,
            photo,
            isExpert,
            isActive
        } = await value;

        const foundAuthor = await Author.findOne({email});

        if (foundAuthor) {
            return res.status(404).send({message: "Author is already registered"});
        }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAuthor = await Author({
            firstName,
            lastName,
            nickName,
            email,
            phone,
            password: hashedPassword,
            info,
            position,
            photo,
            isExpert,
            isActive
    });
    await newAuthor.save();
    res.status(200).send({message: "Author successfully created"});

    } catch (error) {
        console.log(error);
    }
}
const updateAuthor = async (req, res) => {
    try {
        const id  = req.params.id;

        if (!isValidObjectId) {
            return res.status(404).send({message: "Invalid Id"})
        }
        const { error, value } = authorValidation(req.body);

        if (error) {
            return res.status(404).send({message: error.details[0].message});
        }

        const {
            firstName,
            lastName,
            nickName,
            email,
            phone,
            password,
            info,
            position,
            photo,
            isExpert,
            isActive
        } = await value;

        const foundAuthor = await Author.findOne({email});

        if (!foundAuthor) {
            return res.status(404).send({message: "Author not found"});
        }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAuthor = await Author.findOneAndUpdate({_id : id},{
            firstName,
            lastName,
            nickName,
            email,
            phone,
            password: hashedPassword,
            info,
            position,
            photo,
            isExpert,
            isActive
    }, {returnOriginal: true});
    console.log(updateAuthor)
    res.status(200).send({message: "Author successfully updated"});

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
}