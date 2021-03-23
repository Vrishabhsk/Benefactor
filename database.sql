CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    user_id INT,
    task_id SERIAL PRIMARY KEY,
    sub TEXT,
    des TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE subjects (
    user_id INT,
    sub VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE exams (
    sub VARCHAR(255),
    exam_name TEXT,
    max_marks INT,
    scored INT,
    FOREIGN KEY (sub) REFERENCES subjects(sub)
);

CREATE TABLE attendance (
    user_id INT,
    sub_att VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE att (
    sub_att VARCHAR(255),
    attended INT,
    tot_classes INT,
    FOREIGN KEY (sub_att) REFERENCES attendance(sub_att)
);