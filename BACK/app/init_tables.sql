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
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `user_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `user_has_worked_how_long` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `hours_worked` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_has_task` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `task_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE CASCADE
);

ALTER TABLE `task` MODIFY COLUMN start_date DATETIME NOT NULL;
ALTER TABLE `task` MODIFY COLUMN end_date DATETIME NOT NULL;

/* SEEDING  */

INSERT INTO `task` (`libelle`, `start_date`, `end_date`, `description`, `status`, `user_id`) VALUES ('Task 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Description 1', 'En cours', 1);

INSERT INTO `user` (`firstname`, `lastname`, `email`, `password`) VALUES ('John', 'Doe', 'jd@gmail.com', '123456');


/* Quand j'ajoute une task a un user 

        (requette getone user qui me donne les taches associées/assignées a cet user)
         - si il n'a pas de taches assignées = Pas de souci j'assigne la nouvelle tache 
         - si la requette getone user montre qu'il y a un ou plusieurs taches associées/assignées a cet user

                (possibilité : avoir une table "user_is_working" definie comme suit)

                | id | user_id | task_id | start | end | 

                (autre possibilité)

                PREMIERE CONDITION => 

                si je veux ajouter une tache a un user mais que ce user a deja des taches associés
                
                calcul pour savoir si l'utilisateur est libre au moment de la tache a ajouter. 

                si start date et end date sont plus petites que la date de debut de la tache a comparerer 
                                                    &&
                si start date et end date sont plus grande que la date de fin de la tache a comparerer 

                ok.

                DEUXIEME CONDITION => 

                calcul de la durée totale des taches du ou des jours concernant la tache a associer
                si (durée totale des taches deja presentes) + (durée de la tache a associer) > 8h sur 24h




 */




