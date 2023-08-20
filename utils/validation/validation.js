import Joi from 'joi';

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {}; // create an empty object the request value doesn't exist yet
    }
    req.value["body"] = req.body;
    next();
  };
};

const blogSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).max(1000).required(),
})

const loginSchema = Joi.object({
  username: Joi.string().min(5).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(25).trim().required().messages({
    "string.pattern.base": `Password should be 8 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
})

const schemas = {
    authSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(10).max(10).required(),
    })
}

export { validateRequest, schemas, blogSchema, loginSchema };
