--- Create database first !
CREATE SCHEMA "data";

CREATE EXTENSION ltree;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE data.users (
    "email" text PRIMARY KEY,
    "hash_password" text NOT NULL
);

CREATE TABLE data.sessions (
    "guid_id" uuid PRIMARY KEY DEFAULT public.uuid_generate_v4(),
    "email" text NOT NULL REFERENCES data.users(email) ON DELETE CASCADE,
    "expires" timestamp NOT NULL DEFAULT (now() + interval '8 hour')
);

CREATE TABLE data.posts (
    "id" SERIAL PRIMARY KEY,
    "title" text NOT NULL,
    "text" text NOT NULL,
    "branner_path" text,
    "created" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE data.categories (
    "id" SERIAL PRIMARY KEY,
    "text" text NOT NULL
);

CREATE TABLE data.posts_categories (
    "category_id" integer NOT NULL REFERENCES data.categories(id) ON DELETE CASCADE,
    "post_id" integer NOT NULL REFERENCES data.posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS posts_categories_index ON data.posts_categories (category_id, post_id);

insert into data.categories (text) values ('Svelte');
insert into data.categories (text) values ('SvelteKit');
insert into data.categories (text) values ('TypeScript');
insert into data.categories (text) values ('Node.js');
insert into data.categories (text) values ('Linux');

insert into data.users
(email, hash_password)
values
("support@error404-labs.info.vn", crypt('test', gen_salt('bf', 8)));

GRANT USAGE ON SCHEMA data TO slate_apps;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA data TO GROUP slate_apps;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA data TO GROUP slate_apps;
