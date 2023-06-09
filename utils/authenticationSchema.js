const Joi = require("joi");
const AppError = require("../utils/AppError.js");

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .max(6)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .max(6)
    .required(),

  repeat_password: Joi.ref("password"),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  role: Joi.string().valid("user", "admin"),
  profilePicture:Joi.string()
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const signupValidation = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};
module.exports = { loginValidation, signupValidation };
