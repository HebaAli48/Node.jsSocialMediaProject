const Joi = require("joi");
const AppError = require("../utils/AppError.js");

const createReviewSchema = Joi.object({
    content: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    postId:Joi.string().required().hex().length(24),
    created_at: Joi.date(),
});

const reviewValidation = (req, res, next) => {
  const { error } = createReviewSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const updateReviewSchema = Joi.object({
  content: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  postId:Joi.string().hex().length(24),
  updated_at: Joi.date(),
});

const reviewUpdateValidation = (req, res, next) => {
const { error } = updateReviewSchema.validate(req.body);
if (error) return next(new AppError(error.message, 400));
next();
};

module.exports = { reviewValidation,reviewUpdateValidation };