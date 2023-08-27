CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment text NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id integer NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);