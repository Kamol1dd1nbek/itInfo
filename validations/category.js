const Joi = require('joi');

exports.categoryValidation = async (data) => {
    const schemaCategory = Joi.object({
            categoryName: Joi.string()
                .trim()
                .required(),

            parentCategoryId: Joi.string()
                .alphanum()
                .message("Other characters participated in Id (Parenr category Id)")
                .default("648e50a44fa220fe82fec49a")
                .optional()
        });

    return schemaCategory.validate(data, {abortEarly: false})
}
