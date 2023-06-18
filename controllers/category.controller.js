const { errorHandler } = require("../helpers/errorHandler");
const getBodyData = require("../helpers/getBodyData");
const Category = require("../models/Category.model");
const {categoryValidation} = require("../validations/category");

const getAllcategories = async (req, res) => {
    const categories = await Category.find({});

    if (!categories || categories.length == 0) {
        return res.status(404).send({message: "There are no categories"});
    }

    res.json(categories);

}

const getCategoryById = async (req, res) => {
    const id = req.params.id;

    const category = await Category.findOne({_id: id});

    if (!category) {
        return res.status(404).send({message: "Category not found"})
    }
    
    res.json(category);
}

const addCategory = async (req,  res) => {
    try {
        const { error, value } =await categoryValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).send({message: error.details[0]});
        }

        const { categoryName, parentCategoryId} = value;

        const foundCategory = await Category.findOne({categoryName: {
            $regex: categoryName,
            $options: "i"
        }});

        if (foundCategory) {
            return res.status(404).send({message: "This category has already been added"});
        }

        const newCategory = Category({
            categoryName,
            parentCategoryId
        });

        await newCategory.save();
        res.status(201).send({message: "category added successfully"});
    } catch (error) {
        console.log(error)
    }
}

const updateCategory = async (req, res) => {
    try {
        const { error, value } = await categoryValidation(req.body);
    
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }
    
        const { categoryName, parentCategoryId } = value;

        const id = req.params.id;
    
        const foundCategory = await Category.findOne({_id: id});
    
        if (!foundCategory) {
            return res.status(404).send({message: "Category not found"});
        }
    
        const updatedCategory = await Category.findOneAndUpdate(
            {
                _id: id
            },
            {
                categoryName,
                parentCategoryId
            }, 
            {
                returnOriginal: true
            }
        );
    
        await updatedCategory.save();
        res.status(200).send({message: "Category successfully updated"});
    } catch (error) {
        errorHandler(error);
    }
}

const removeCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const foundCategory = await Category.find({_id: id});

        if (!foundCategory) {
            return res.status(404).send({message: "Category not found"});
        }

        await Category.deleteOne({_id: id});
        res.status(200).send({message: "Category successfully deleted"});
    } catch (error) {
        errorHandler(error);
    }
}

module.exports = {
    getAllcategories,
    getCategoryById,
    addCategory,
    updateCategory,
    removeCategory
}