CREATE DATABASE user_list;


CREATE TABLE employeeusers(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) DEFAULT '',
    user_resume 
);
CREATE TABLE employer(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL
)
INSERT INTO users(user_name,user_email,user_password) VALUES('Hello','aa@a.com','pasww');