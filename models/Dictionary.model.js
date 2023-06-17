const {Schema, model} = require('mongoose');

const dictionarySchema = new Schema(
    {
        term: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        letter: {
            type: String,
            uppercase: true,
            required: true
        }
    },
    {
        versionKey: false
    });

module.exports = model("Dictionary", dictionarySchema);