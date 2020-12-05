const express = require('express');
const xss = require('xss');
const CommentService = require('./comment-service');
const { requireAuth } = require('../middleware/jwt-auth');


const commentRouter = express.Router();
const jsonParser = express.json();

commentRouter
    .route('/:post_id')
    .get(requireAuth, async (req, res, next) => {

        try {
            const comments = await CommentService.getCommentsForPost(
                req.app.get('db'),
                req.params.post_id
            )
            return res
                .status(200)
                .json(comments)
        }

        catch (error) {
            next(error)
        }

    })

    .post(requireAuth, jsonParser, async (req, res, next) => {
        try {
            let { text } = req.body;
            text = xss(text);

            await CommentService.insertComment(
                req.app.get('db'),
                req.user.id,
                req.params.post_id,
                text
            )

            const comm = await CommentService.getCommentsForPost(
                req.app.get('db'),
                req.params.post_id,
            )

            return res
                .status(200)
                .json(comm)
        }
        catch (error) {
            next(error)
        }
    })




module.exports = commentRouter;