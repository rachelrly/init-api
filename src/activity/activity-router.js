const express = require('express')
const xss = require('xss')
const ActivityService = require('')
const { requireAuth } = require('../middleware/jwt-auth');

ActivityRouter = express.Router();
const jsonParser = express.json()

const serializeActivities = activities => {
    return activities.map(activity => {
        return {
            id: activity.id,
            date_created: activity.date_created,
            user_id: activity.user_id,
            following_id: activity.following_id,
            post_id: activity.post_id,
            unread: activity.unread
        }
    });
}
// post_id only exists in the comment details.

ActivityRouter
    .route('/:following_id')
    .get(requireAuth, async (req, res, next) => {

        try {
            const activities = await Activitieservice.getactivitiesForPost(
                req.app.get('db'),
                req.params.post_id
            )
            return res
                .status(200)
                .json(serializeactivities(activity))
                .end()
        }

        catch (error) {
            next(error)
        }
    })

module.exports = ActivityRouter;