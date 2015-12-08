CREATE DATABASE eventski;

\c eventski;

CREATE TABLE accounts (id SERIAL PRIMARY KEY, user_name VARCHAR(255), user_email VARCHAR(255), password_digest VARCHAR(255), is_admin BOOLEAN);

CREATE TABLE mountains (id SERIAL PRIMARY KEY, mountain_lat DECIMAL, mountain_long DECIMAL,
mountain_name VARCHAR(255), mountain_city VARCHAR(255), mountain_state VARCHAR(255), mountain_url TEXT);

CREATE TABLE events (id SERIAL PRIMARY KEY, day DATE, event_name VARCHAR(500), event_url TEXT, event_user_id
INTEGER REFERENCES accounts (id), event_mountain_id INTEGER REFERENCES mountains (id));
