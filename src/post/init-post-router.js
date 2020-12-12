const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const InitPostService = require('./init-post-service');
const { requireAuth } = require('../middleware/jwt-auth')

const initPostRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + new Date().toISOString());
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1 // allowed image size, set to 1MB
    }
})

initPostRouter
    .route('/upload')
    .post(requireAuth, [upload.single('imageRequest')], uploadPost)

initPostRouter
    .route('/download')
    .get(requireAuth, downloadPost)

initPostRouter
    .route('/feed')
    .get(requireAuth, downloadFeed)

const serializePost = (post) => {

    return {
        post_id: post.id,
        title: post.post_title,
        live_link: post.post_live_link,
        repository: post.post_repository,
        tech_stack: post.tech_stack,
        user_id: post.user_id,
        username: post.username,
        fullname: post.fullname,
        description: post.post_description
    }
}

async function uploadPost(req, res, next) {
    try {
        const imgData = fs.readFileSync(req.file.path)

        const uploadData = {
            username: req.user.username,
            post_title: req.body.post_title,
            post_description: req.body.post_description,
            post_live_link: req.body.post_live_link,
            post_repository: req.body.post_repository,
            post_image_file: imgData,
            post_image_type: req.file.mimetype,
            tech_stack: req.body.tech_stack,
            date_created: req.body.date_created,
        }

        uploadData.user_id = req.user.id

        const rows = await InitPostService.insertPost(
            req.app.get('db'),
            uploadData
        )

        fs.unlink(req.file.path, function (err) {
            if (err) {
                next(err)
                return
            }
            res.sendStatus(201)
        })
    } catch (error) {
        next(error)
    }
}

async function downloadPost(req, res, next) {
    try {
        let user_id = !req.query.id ? req.user.id : parseInt(req.query.id)

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const rows = await InitPostService.getUserPosts(
            req.app.get('db'),
            user_id)

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < rows.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        };

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        };

        results.results = rows.slice(startIndex, endIndex);
        res.json(results);

    } catch (error) {
        next(error)
    }
}

async function downloadFeed(req, res, next) {
    console.log('download feed')
    try {
        //this id should be used to get follow list

        const rows = await InitPostService.getFeedPosts(
            req.app.get('db'),
            req.user.id)

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < rows.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        };

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        };

        results.results = rows.slice(startIndex, endIndex);
        res.json(results);

    } catch (error) {
        next(error)
    }
}

initPostRouter
    .route('/:post_id')
    .get(requireAuth, async (req, res, next) => {

        try {
            const post = await InitPostService.getPostById(
                req.app.get('db'),
                req.params.post_id
            )

            return res
                .status(200)
                .json(serializePost(post))
                .end()

        }
        catch (error) {
            next(error)
        }

    })


module.exports = initPostRouter;