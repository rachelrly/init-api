const AvatarService = require('../avatar/avatar-service');

const unreadActivitiesService = {
        async getAllUnreadFollowingUser(db, user_id) {
            console.log("getting user's following")
            try {
                const aUsersFollowing = await db
                    .select('*')
                    .from('init_following')
                    .where({ unread: true, users_id: user_id })
                    .orderBy('date_created')
                    
                const aUsersFollowingData = await Promise.all(
                    aUsersFollowing.map(async f => {
                    
                        const { following_id } = f

                        const [followingData] = await db
                            .select('u.id', 'u.username', 'u.fullname', 'a.img_type', 'a.img_file')
                            .from('user_information as u')
                            .leftJoin('user_avatar as a', 'a.user_id', 'u.id')
                            .where({ 'u.id': following_id })

                        return followingData

                    }))
                return aUsersFollowingData;
            }
            catch (error) {
                return console.log(error)
            }
        },

// return all comments unread for all post belonging to this user 
        async getAllUnreadCommentsForUser(db, user_id) {
            try {
                const unreadComments = await db
                    .select('init_comments.*')
                    .from('init_comments')
                    .join('init_posts', 'init_posts.id', 'init_comments.post_id')
                    .where({ 'init_comments.unread': true, 'init_posts.user_id': user_id })
                    .orderBy('init_comments.date_created')
                    console.log('unread comments:', unreadComments)
    
                const fullComments = await Promise.all(
                    unreadComments.map(async c => {
                        try {
                            const [user] = await db
                                .select('u.username', 'user_avatar.img_type', 'user_avatar.img_file')
                                .from('user_information as u')
                                .leftJoin('user_avatar', 'user_avatar.user_id', 'u.id')
                                .where({ 'u.id': c.user_id })
                            return {
                                username: user.username,
                                img_type: user.img_type,
                                img_file: user.img_file,
                                ...c
                            }
                        }
                        catch (error) {
                            return console.log(error)
                        }
                    }))
    
                return fullComments;
            }
            catch (error) {
                return console.log(error)
            }
    
        }
       
}


module.exports = unreadActivitiesService;