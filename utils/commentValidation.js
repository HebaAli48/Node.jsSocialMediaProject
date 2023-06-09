const Joi = require("joi");
const AppError = require("../utils/AppError.js");



const createCommentSchema = Joi.object({
    content: Joi.string().required(),
    postId:Joi.string().required().hex().length(24),
    created_at: Joi.date(),
    updated_at: Joi.date(),
});

const commentValidation = (req, res, next) => {
  const { error } = createCommentSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const updateCommentSchema = Joi.object({
  content: Joi.string().required(),
  postId:Joi.string().hex().length(24),
  updated_at: Joi.date(),
});

const commentUpdateValidation = (req, res, next) => {
const { error } = updateCommentSchema.validate(req.body);
if (error) return next(new AppError(error.message, 400));
next();
};

module.exports = { commentValidation,commentUpdateValidation };