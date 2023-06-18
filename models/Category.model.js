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
            default: "648e50a44fa220fe82fec49a"
        }
    },
    {
        versionKey: false,
    }
);

module.exports = model("Category", categorySchema);