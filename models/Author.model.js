const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
    {
        firstName: {
            type: String,
            min: 2,
            max: 40,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            min: 2,
            max: 40,
            required: true,
        },
        nickName: {
            type: String,
            max: 50,
            unique: true,
            required: true
        },
        email:  {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            min: 10,
        },
        password: {
            type: String,
            min: 5,
            max: 30,
            required: true
        },
        info: {
            type: String,
            max: 110
        },
        position: {
            type: String,
            min: 2
        },
        photo: {
            type: String,
            default: "author.png"
        },
        isExpert: {
            type: Boolean,
            default: false
        },
        authorIsActive: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("Author", authorSchema);