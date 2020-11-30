const AvatarService = require('../avatar/avatar-service');

const ActivityService = {
    async getActivityForUser(db, post_id) {
        try {
            const activities = await db
                .from('init_comments', 'init_following')
                .select('*')
                .where({ following_id, post_id })
                .orderBy('date_created', 'desc')

}


module.exports = ActivityService;