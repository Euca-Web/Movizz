-- Création de la base de données
DROP DATABASE IF EXISTS Movizz;
CREATE DATABASE Movizz;

-- Table : Roles utilisateurs
CREATE TABLE Movizz.roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Table : Genres
CREATE TABLE Movizz.gender (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table : Utilisateurs
CREATE TABLE Movizz.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET DEFAULT
);

-- Table : Films
CREATE TABLE Movizz.movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_id INT,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    release_date DATE,
    duration INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    director VARCHAR(255),
    FOREIGN KEY(gender_id) REFERENCES gender(gender_id)
);

-- Table : Association Films <-> Genres
CREATE TABLE Movizz.movie_gender (
    movie_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (movie_id, gender_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE
);

-- Table : Commentaires
CREATE TABLE Movizz.comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    movie_id INT, -- Null si c'est pour une série
    created_at DATETIME DEFAULT(NOW()),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE    
);

-- Table : Favoris
CREATE TABLE Movizz.favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Insertion des données
-- Insertion des rôles
INSERT INTO Movizz.roles (role_id, role_name, description) VALUES
(1, 'user', 'Utilisateur standard avec des droits limités'),
(2, 'admin', 'Administrateur avec tous les droits');

-- Insertion des utilisateurs
INSERT INTO Movizz.users (username, email, password_hash, role_id) VALUES
('admin', 'admin@example.com', '$argon2i$v=19$m=16,t=2,p=1$emFkbXBHQVJzN3U1aWU1Vg$6WMsugKFXLRuacf0AL2zHg', 2), -- Admin --mdp=admin
('user1', 'user1@example.com', '$argon2i$v=19$m=16,t=2,p=1$aHg4V3BrUFV1VklhVEoyVg$MzFRU/mvrilQQkT3dofg9Q', 1); -- Utilisateur standard --mdp=user1

INSERT INTO Movizz.movies (title, summary, release_date, duration, poster_url, trailer_url) VALUES
('BDD_Test', 'Un test pour être sur que tout fonctionne.', '2025-04-19', 999, 'https://example.com/test.jpg', 'https://example.com/test-trailer.mp4'),

INSERT INTO Movizz.gender (gender_name) VALUES
('Action'),
('Aventure'),
('Science-Fiction'),
('Drame'),
('Fantastique'),
('Thriller'),
('Comédie'),
('Animation'),
('Romance'),
('Horreur'),
('Mystère'),
('Crime'),
('Documentaire'),
('Famille'),
('Historique'),
('Musical'),
('Guerre'),
('Biographie'),
('Sport'),
('Western');

INSERT INTO Movizz.movie_gender (movie_id, gender_id) VALUES
(1, 3), (1, 6), -- BDD_Test - Science-Fiction, Thriller
