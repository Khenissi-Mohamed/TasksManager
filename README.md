# lien du site 

https://tasks-manager-x6rz.vercel.app/

# Sprint 1

## Analyser les fonctionnalitées

### INTERFACE 1
----

#### Mettre en place une connection sécurisée via un formulaire de connection

- Ajout d’une tâche avec un libellé.
- Ajout d’une tâche avec une heure de début.
- Ajout d’une tâche avec une heure de fin.
- Formulaire de connection pour accéder à l’interface .

### INTERFACE 2
---

- Visualiser les tâches enregistrées.
- Trier les tâches par heure de début.
- Trier les tâches par heure fin.
- Trier les tâches par libellé.
- Supprimer une tâche.

### INTERFACE 3
---
- Affecter une tâche à un employé. 
- Visualiser la disponibilité de l’employé affecté pour ne pas dépasser 8h de travail journalier.
- Un employé ne peut traiter qu’une tâche à la fois.


# Base de données 

# MCD 

Un employé est affecté au minimum à une tâche et au maximum à une tâche
une tâche est affecté au maximum à 0 employé et au maximum plusieurs employé 


# user

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | INT | non | aucun|
| firstname | VARCHAR | non | "" |
| lastname | VARCHAR | non | 0 |
| email | VARCHAR | non | null |
| password | VARCHAR | non | null |


# task

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | INT | non | aucun|
| libelle | TEXT | non | "" |
| start_date | DATETIME | non | aucun |
| end_date | DATETIME | non | aucun |
| description | VARCHAR | non | "" |
| status | VARCHAR | non | null |
| user_id | INT | non | aucun |


- Un employé est affecté au minimum à une tâche et au maximum à une tâche.
- Une tâche est affecté au maximum à 0 employé et au maximum plusieurs employé. 

---
# User Stories

|En tant que|Je veux pouvoir| Dans le but de|
|---|---|---|
|Utilisateur|Afficher un formulaire|de me connecter|
|Utilisateur|Créer une tâche|l'afficher et l'assigner |
|Utilisateur|afficher les tâches|voir leur status |
|Utilisateur|afficher les tâches|supprimer une tâche |

# Sprint 2

## Architecture de l’application

### Technologies 

### BACK
- Node js

MySQL, Express, Dotenv, Cors, Bcrypt, Jsonwebtoken

---

### FRONT
- Vue js

Vite, Vue, Vue-router, Axios

---

## MVC modèle vue contrôleur


- réalisation du CRUD des tables task et user.

- gestion des routes sécurisées.

- token, gestion des erreur dans le dossier utils.

- ORM choisie : data mapper pattern.

---

# Sprint 3

## Model Vite de Vue.js 

### 7 composants : 
- homePage
- navBar
- inscription
- login
- addTask
- tasksAssignement
- tasksPage

### Lorsque que l'utilisateur accède au site :

- il doit se connecter pour accéder aux autres page.
- sinon il sera redirigé vers un formulaire d'incription.
- il est redirigé vers la page pour créer des tâches et il a accès via la navbar aux autres page du site : 
- voir les taches et à qui elles sont assignées.
- assigner les tâches.

# Explication des erreurs et proposition de solutions

### gestion du responsive
---

Avec la puissance de flexbox j'ai pu gerer le responsive en utilisant la methode css (media queries) à un seul endroit (tableau des tâches) 

### La méthode "update" pour la gestion d'affectation de tâches (back)
---

 Je met à jour la base de données avec les nouvelles informations d'une tâche et vérifie si l'utilisateur est disponible pour la nouvelle tâche en comparant les dates de début et de fin avec les tâches déjà assignées.  
 Si l'utilisateur est disponible, la tâche est assignée et un message de confirmation est renvoyé.  
 Sinon, un message d'erreur est renvoyé indiquant qu'une tâche est déjà prévue pour la même période ou que l'utilisateur a déjà 8 heures de travail prévues pour la journée de la nouvelle tâche.

### La "tasksSorted" pour trier les tâches (front)
---

 J'affiche la liste de tâches pour permettre de trier les tâches en fonction de leur heure de début, de fin ou de leur libellé.  
 Les tâches sont récupérées à partir de API en utilisant Axios et sont stockées dans la variable tasks.
 Je constate assez tard qu'il y a un bug sur cette fonction.


## Vue js et MySQL
---

J'ai été amené à réaliser cette application en utilisant des technologies que je ne connaissais pas auparavant, ce qui m'a obligé à m'adapter tout au long du processus de développement.  
Bien que je n'aie pas pu obtenir le résultat exact que je souhaitais, j'ai pris beaucoup de plaisir à travailler sur ce projet.   
Je tiens à remercier Monsieur Juillet pour cette opportunité, qui m'a permis d'acquérir de nouvelles compétences et de progresser dans mon parcours professionnel.  
J'espère avoir l'occasion de continuer à apprendre et à grandir avec votre équipe.