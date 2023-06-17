const { Schema, model } = require("mongoose");

const synonymSchema = new Schema(
    {
        descriptionId: {
            type: Schema.Types.ObjectId,
            ref: "Description",
        },
        dictionaryId: {
            type: Schema.Types.ObjectId,
            ref: "Dictionary"
        }
    },
    {
        versionKey: false
    }
);

module.exports = model("Synonym", synonymSchema);