SELECT u.id, u.username, u.fullname, u.user_stack, u.about_user, user_avatar.img_type,
  (SELECT count(*) AS NoPosts FROM init_posts WHERE init_posts.user_id = u.id),
  (SELECT count(*) AS FBU FROM init_following WHERE init_following.users_id = u.id),
  (SELECT count(*) AS UF FROM init_following WHERE init_following.following_id = u.id)
FROM user_information AS u
LEFT JOIN user_avatar ON user_avatar.user_id = u.id;

.SELECT('u.id', 'u.username', 'u.fullname', 'u.user_stack', 'u.about_user', 'user_avatar.img_type',
  knew.raw("(SELECT count(*) AS NoPosts FROM init_posts WHERE init_posts.user_id = u.id)"),
  knew.raw("(SELECT count(*) AS FBU FROM init_following WHERE init_following.users_id = u.id)"),
  knew.raw("(SELECT count(*) AS UF FROM init_following WHERE init_following.following_id = u.id)"))
.FROM('user_information AS u')
.LEFTJOIN('user_avatar', 'user_avatar.user_id' = id)