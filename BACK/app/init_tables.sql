CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL UNIQUE,
    `lastname` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `task` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `libelle` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `user_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);




/* SEEDING  */

INSERT INTO `task` (`libelle`, `start_date`, `end_date`, `description`, `status`, `user_id`) VALUES ('Task 1', '2021-01-01', '2021-01-02', 'Description 1', 'En cours', 1)

INSERT INTO `user` (`firstname`, `lastname`, `email`, `password`) VALUES ('John', 'Doe', 'jd@gmail.com', '123456');
