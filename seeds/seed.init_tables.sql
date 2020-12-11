BEGIN;

TRUNCATE
    user_information,
    init_posts,
    init_following
    RESTART IDENTITY CASCADE;

INSERT INTO user_information (fullname, username, user_password, email, about_user, user_stack)
VALUES
    ('Dev One', 'developer1', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'goku@gmail.com', 'I love to eat, fight, and that is about it!', 'Frontend'),
    ('Dev Two', 'developer2', '$2a$12$yLwyuRRlkhaATZ8PtuhX7eiWvJmmkWyvy74.yvBzJGLSZiGumrrDa', 'vegeta@gmail.com', 'Just another programmer here.', 'Full Stack'),
    ('Dev Three', 'developer3', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'gohan@yahoo.com', 'Proud nerd and father.', 'Backend'),
    ('Test User', 'testuser', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'testuser@gmail.com', 'A fullstack developer and programming enthusiast', 'Frontend'),
    ('Dev Four', 'developer4', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks1@yahoo.com', 'Just another programmer here.', 'Frontend'),
    ('Dev Five', 'developer5', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks2@yahoo.com', 'Just another programmer here.', 'Frontend'),
    ('Dev Six', 'developer6', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks3@yahoo.com', 'Just another programmer here.', 'Frontend'),
    ('Rachel Reilly', 'rachanastasia', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'rachel@gmail.com', 'JavaScript developer and co-creator of  Init.', 'Full Stack');


INSERT INTO init_following (following_id, users_id)
VALUES
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (4, 2),
    (1, 2),
    (3, 2),
    (6, 2),
    (7, 2),
    (8, 2),
    (1, 4),
    (2, 4),
    (3, 4),
    (6, 4),
    (7, 4),
    (8, 4),
    (5, 4),
    (1, 8),
    (2, 8),
    (3, 8),
    (4, 8),
    (5, 8),
    (6, 8),
    (7, 8),
    (1, 5),
    (2, 5),
    (3, 5),
    (8, 5),
    (3, 6),
    (5, 6),
    (7, 6),
    (8, 6),
    (4, 6);

COMMIT;