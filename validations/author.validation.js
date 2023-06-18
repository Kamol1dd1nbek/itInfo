const Joi = require("joi");

exports.authorValidation = (data) => {
    const schemaAuthor = Joi.object({
        firstName: Joi.string()
            .trim()
            .min(2)
            .max(40)
            .required(),
        lastName: Joi.string()
            .trim()
            .min(2)
            .max(40),
        nickName: Joi.string()
            .max(50)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
        password: Joi.string()
            .min(5)
            .max(30)
            .required(),
        rePassword: Joi.ref("password"),
        info: Joi.string()
            .max(110),
        position: Joi.string()
            .optional(),
        photo: Joi.string()
            .default("author.png"),
        isExpert: Joi.boolean()
            .default(false),
        authorIsActive: Joi.boolean()
            .default(true),
    });
    return schemaAuthor.validate(data, {abortEarly: false});
}