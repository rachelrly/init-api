const express = require('express');
const xss = require('xss');
const FollowService = require('./follow-service');
const { requireAuth } = require('../middleware/jwt-auth');

const followRouter = express.Router();
const jsonParser = express.json();

followRouter
    .route('/')

    .get(requireAuth, async (req, res, next) => {
        try {
            let id = req.body ? req.body.id : req.user.id;

            const followedByUser = await FollowService.getAllFollows(
                req.app.get('db'), id);

            const followingUser = await FollowService.getAllFollowing(
                req.app.get('db'), id);

            return await res
                .status(200)
                .json({
                    followedByUser: followedByUser,
                    followingUser: followingUser
                });
        }
        catch (error) {
            next(error);
        }

    })

    .post(requireAuth, jsonParser, async (req, res, next) => {
        try {
            const { following_id } = req.body;

            if (following_id === req.user.id) {
                return res
                    .status(400)
                    .json({ error: 'A user cannot follow themself' })
            };

            let isFollowing = await FollowService.isFollowing(
                req.app.get('db'),
                following_id,
                req.user.id
            );

            if (isFollowing) {
                return res
                    .status(400)
                    .json({ error: 'user is already following' })
            }

            else {
                await FollowService.addFollow(
                    req.app.get('db'),
                    req.user.id,
                    following_id
                );

                const following = await FollowService.getAllFollows(
                    req.app.get('db'),
                    req.user.id);

                return res
                    .status(200)
                    .json(following);


            }
        }
        catch (error) {
            next(error)
        }
    })

    .delete(requireAuth, jsonParser, async (req, res, next) => {

        try {
            const { following_id } = req.body;

            if (following_id === req.user.id) {
                return res
                    .status(400)
                    .json({ error: 'A user cannot unfollow themself' });

            }

            const isFollowing = await FollowService.isFollowing(
                req.app.get('db'),
                following_id,
                req.user.id
            );

            if (!isFollowing) {
                return res
                    .status(400)
                    .end()
            }

            else {
                await FollowService.removeFollow(
                    req.app.get('db'),
                    following_id,
                    req.user.id
                );
                const following = await FollowService.getAllFollows(
                    req.app.get('db'),
                    req.user.id);


                return res
                    .status(200)
                    .json(following);

            }
        }
        catch (error) {
            next(error);
        }
    });

module.exports = followRouter;
