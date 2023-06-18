const Joi = require("joi");

exports.descriptionValidation = (data) => {
    descriptionSchema = Joi.object({
        categoryId: Joi.string()
            .required(true),
        description: Joi.string()
            .trim()
            .required()
    });

    return descriptionSchema.validate(data, {abortEarly: false});
}