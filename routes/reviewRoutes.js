const express = require("express");
const router = express.Router();

const { reviewValidation,reviewUpdateValidation} = require('../utils/reviewValidation.js');
const { createReview, getReviewById, getAllReviews, updateReviewById, deleteReviewById } = require('../controllers/reviewController.js');

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/',reviewValidation, createReview);
router.patch('/:id',reviewUpdateValidation, updateReviewById);
router.delete('/:id', deleteReviewById);


module.exports = router;
