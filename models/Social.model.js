const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
    {
        socialName: {
            type: String,
            trim: true,
            min: 2,
            max: 70,
            unique: true,
            required: true
        },
        socialIconFile: {
            type: String,
            default: "social.png"
        }
    },
    {
        versionKey: false
    }
);

module.exports = model("Social", socialSchema);