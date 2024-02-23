CREATE TABLE IF NOT EXISTS users
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    login      VARCHAR(50) UNIQUE                 NOT NULL,
    email      VARCHAR(191)                       NOT NULL,
    password   VARCHAR(255)                       NOT NULL,
    created_at TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todos
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id    INTEGER                            NOT NULL,
    title      VARCHAR(191)                       NOT NULL,
    completed  BOOLEAN                            NOT NULL DEFAULT false,
    created_at TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE todos
    ADD FOREIGN KEY (user_id) REFERENCES users (id);
