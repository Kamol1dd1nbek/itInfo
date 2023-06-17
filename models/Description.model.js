const {Schema, model} = require("mongoose");

const descriptionSchema = new Schema(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        description: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        versionKey: false,
    }
);

module.exports = model("Description", descriptionSchema);