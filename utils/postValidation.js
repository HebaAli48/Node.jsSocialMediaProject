const Joi = require("joi");
const AppError = require("../utils/AppError.js");

const createPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    creatorId: Joi.string().required().hex().length(24),
    created_at: Joi.date(),
    updated_at: Joi.date(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  creatorId: Joi.string().hex().length(24),
  created_at: Joi.date(),
  updated_at: Joi.date(),
});

const postValidation = (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};
const updatePostValidation = (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { postValidation,updatePostValidation };
