
const AvatarService = {
    getAvatar(db, id) {
        return db
            .from('user_avatar AS avatar')
            .select('*')
            .where('avatar.user_id', id)
    },

    insertAvatar(db, uploadData) {
        return db
            .insert(uploadData)
            .into('user_avatar')
            .returning('*')
            .then(([data]) => data)
    },

    getById(db, id) {
        return db
            .from('user_avatar AS avatar')
            .select('*')
            .where('avatar.id', id)
    },


    updateAvatar(db, id, newAvatarFields) {
        return db
            .from('user_avatar')
            .where({ id })
            .update(newAvatarFields)
    }

};

module.exports = AvatarService;