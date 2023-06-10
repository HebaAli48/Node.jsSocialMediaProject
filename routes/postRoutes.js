const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Post = require("../models/post.js");
const AppError = require("../utils/AppError.js");

const bcrypt = require("bcrypt");
const Joi = require("joi");

const { postValidation,updatePostValidation} = require('../utils/postValidation.js');
const { createPost, getPostById, getAllPosts, updatePostById, deletePostById,getTop5RatedPosts } = require('../controllers/postController');

router.get('/top', getTop5RatedPosts);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', postValidation, createPost);
router.patch('/:id', updatePostValidation, updatePostById);
router.delete('/:id', deletePostById);


module.exports = router;
