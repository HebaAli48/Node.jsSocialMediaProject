const express = require("express");
const router = express.Router();
const comment = require("../models/post.js");

const {  commentValidation,commentUpdateValidation} = require('../utils/commentValidation.js');
const { createComment, getCommentById, getAllComments, updateCommentById, deleteCommentById } = require('../controllers/commentController');

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', commentValidation, createComment);
router.patch('/:id',commentUpdateValidation, updateCommentById);
router.delete('/:id', deleteCommentById);


module.exports = router;
