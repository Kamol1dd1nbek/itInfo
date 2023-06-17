const {Schema, model} = require("mongoose");

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        parentCategoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        }
    },
    {
        versionKey: false,
    }
);

module.exports = model("Category", categorySchema);