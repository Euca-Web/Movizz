-- -- Supprimer la base de donnée si elle existe
-- DROP DATABASE IF EXISTS Blockbusters_Simplon;
-- CREATE DATABASE Blockbusters_Simplon;

-- -- Table Gender
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.gender (
--     gender_id INT AUTO_INCREMENT PRIMARY KEY,
--     gender_name VARCHAR(50)
-- );

-- -- Table Role
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.role (
--     role_id INT AUTO_INCREMENT PRIMARY KEY,
--     role_name VARCHAR(50)
-- );

-- -- Table User
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.user (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(100) NOT NULL
-- );

-- -- Table Director
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.director (
--     director_id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100),
--     birth_date DATE,
--     nationality VARCHAR(50)
-- );

-- -- Table Actor
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.actor (
--     actor_id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100),
--     birth_date DATE,
--     nationality VARCHAR(50)
-- );

-- -- Table Movie
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.movie (
--     movie_id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255),
--     release_year YEAR,
--     duration INT,
--     summary TEXT,
--     poster VARCHAR(255),
--     teaser VARCHAR(255),
--     gender_id INT,
--     director_id INT,
--     FOREIGN KEY (gender_id) REFERENCES Blockbusters_Simplon.gender(gender_id),
--     FOREIGN KEY (director_id) REFERENCES Blockbusters_Simplon.director(director_id)
-- );

-- -- Table Favorites
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.favorites (
--     movie_id_user_id INT AUTO_INCREMENT PRIMARY KEY,
--     movie_id INT,
--     user_id INT,
--     FOREIGN KEY (movie_id) REFERENCES Blockbusters_Simplon.movie(movie_id),
--     FOREIGN KEY (user_id) REFERENCES Blockbusters_Simplon.user(user_id)
-- );

-- -- Table Reviews
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.reviews (
--     review_id INT AUTO_INCREMENT PRIMARY KEY,
--     rate DECIMAL(3, 2),
--     comments TEXT,
--     date_of_comms DATE,
--     user_id INT,
--     movie_id INT,
--     FOREIGN KEY (user_id) REFERENCES Blockbusters_Simplon.user(user_id),
--     FOREIGN KEY (movie_id) REFERENCES Blockbusters_Simplon.movie(movie_id)
-- );

-- -- Table movie_director
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.movie_director (
--     movie_director_id INT AUTO_INCREMENT PRIMARY KEY,
--     movie_id INT,
--     director_id INT,
--     FOREIGN KEY (movie_id) REFERENCES Blockbusters_Simplon.movie(movie_id),
--     FOREIGN KEY (director_id) REFERENCES Blockbusters_Simplon.director(director_id)
-- );

-- -- Table movie_actor
-- CREATE TABLE IF NOT EXISTS Blockbusters_Simplon.movie_actor (
--     movie_actor_id INT AUTO_INCREMENT PRIMARY KEY,
--     movie_id INT,
--     actor_id INT,
--     is_main_actor BOOLEAN,
--     FOREIGN KEY (movie_id) REFERENCES Blockbusters_Simplon.movie(movie_id),
--     FOREIGN KEY (actor_id) REFERENCES Blockbusters_Simplon.actor(actor_id)
-- );




-- -- Insertion dans la table Gender
-- -- Insertion pour les genres de films
-- INSERT INTO Blockbusters_Simplon.gender (gender_name) VALUES 
-- ('Action'),
-- ('Comedy'),
-- ('Drama'),
-- ('Horror'),
-- ('Sci-Fi'),
-- ('Romance'),
-- ('Thriller'),
-- ('Fantasy'),
-- ('Adventure'),
-- ('Animation'),
-- ('Crime'),
-- ('Documentary'),
-- ('Family'),
-- ('Musical'),
-- ('War'),
-- ('Biography'),
-- ('Western'),
-- ('Mystery'),
-- ('Historical'),
-- ('Sport');

-- -- Insertion dans la table Role
-- INSERT INTO Blockbusters_Simplon.role (name) VALUES 
-- ('Admin'),
-- ('User');

-- -- Insertion dans la table User
-- INSERT INTO Blockbusters_Simplon.user (name, email, password) VALUES 
-- ('John Doe', 'john.doe@example.com', 'password123'),
-- ('Jane Smith', 'jane.smith@example.com', 'securepassword'),
-- ('Alice Johnson', 'alice.j@example.com', 'alicepass');

-- -- Insertion dans la table Director
-- INSERT INTO Blockbusters_Simplon.director (first_name, last_name, birth_date, nationality) VALUES
-- ('Luc', 'Besson', '1959-03-18', 'French'),
-- ('Christopher', 'Nolan', '1970-07-30', 'British'),
-- ('Steven', 'Spielberg', '1946-12-18', 'American'),
-- ('Jean-Pierre', 'Jeunet', '1953-09-03', 'French'),
-- ('Martin', 'Scorsese', '1942-11-17', 'American'),
-- ('Ridley', 'Scott', '1937-11-30', 'British'),
-- ('François', 'Ozon', '1967-11-15', 'French'),
-- ('Quentin', 'Tarantino', '1963-03-27', 'American'),
-- ('Guy', 'Ritchie', '1968-09-10', 'British'),
-- ('Jacques', 'Audiard', '1952-04-30', 'French'),
-- ('James', 'Cameron', '1954-08-16', 'American'),
-- ('Danny', 'Boyle', '1956-10-20', 'British'),
-- ('Roman', 'Polanski', '1933-08-18', 'French'),
-- ('David', 'Fincher', '1962-08-28', 'American'),
-- ('Ken', 'Loach', '1936-06-17', 'British'),
-- ('Jean-Luc', 'Godard', '1930-12-03', 'French'),
-- ('Tim', 'Burton', '1958-08-25', 'American'),
-- ('Alfred', 'Hitchcock', '1899-08-13', 'British'),
-- ('Claude', 'Chabrol', '1930-06-24', 'French'),
-- ('Clint', 'Eastwood', '1930-05-31', 'American'),
-- ('Lynne', 'Ramsay', '1969-12-05', 'British'),
-- ('Patrice', 'Leconte', '1947-11-12', 'French'),
-- ('Spike', 'Lee', '1957-03-20', 'American'),
-- ('Sam', 'Mendes', '1965-08-01', 'British'),
-- ('Michel', 'Gondry', '1963-05-08', 'French'),
-- ('Wes', 'Anderson', '1969-05-01', 'American'),
-- ('Stephen', 'Frears', '1941-06-20', 'British'),
-- ('Louis', 'Malle', '1932-10-30', 'French'),
-- ('John', 'Ford', '1894-02-01', 'American'),
-- ('Mike', 'Leigh', '1943-02-20', 'British'),
-- ('Agnès', 'Varda', '1928-05-30', 'French'),
-- ('Orson', 'Welles', '1915-05-06', 'American'),
-- ('Peter', 'Brook', '1925-03-21', 'British'),
-- ('Éric', 'Rohmer', '1920-03-21', 'French'),
-- ('Robert', 'Altman', '1925-02-20', 'American'),
-- ('Sam', 'Peckinpah', '1925-02-21', 'American'),
-- ('Édouard', 'Molinaro', '1928-05-13', 'French'),
-- ('Woody', 'Allen', '1935-12-01', 'American'),
-- ('Alain', 'Resnais', '1922-06-03', 'French'),
-- ('Stanley', 'Kubrick', '1928-07-26', 'American'),
-- ('Peter', 'Greenaway', '1942-04-05', 'British'),
-- ('Georges', 'Méliès', '1861-12-08', 'French'),
-- ('Francis Ford', 'Coppola', '1939-04-07', 'American'),
-- ('Michael', 'Winterbottom', '1961-03-29', 'British'),
-- ('Abel', 'Gance', '1889-10-25', 'French'),
-- ('John', 'Cassavetes', '1929-12-09', 'American'),
-- ('Richard', 'Attenborough', '1923-08-29', 'British'),
-- ('Bertrand', 'Tavernier', '1941-04-25', 'French'),
-- ('George', 'Lucas', '1944-05-14', 'American'),
-- ('David', 'Lean', '1908-03-25', 'British');

-- -- Insertion dans la table Actor
-- INSERT INTO Blockbusters_Simplon.actor (first_name, last_name, birth_date, nationality) VALUES
-- ('Jean', 'Dujardin', '1972-06-19', 'French'),
-- ('Brad', 'Pitt', '1963-12-18', 'American'),
-- ('Emma', 'Watson', '1990-04-15', 'British'),
-- ('Marion', 'Cotillard', '1975-09-30', 'French'),
-- ('Leonardo', 'DiCaprio', '1974-11-11', 'American'),
-- ('Daniel', 'Craig', '1968-03-02', 'British'),
-- ('Vincent', 'Cassel', '1966-11-23', 'French'),
-- ('Tom', 'Cruise', '1962-07-03', 'American'),
-- ('Kate', 'Winslet', '1975-10-05', 'British'),
-- ('Charlotte', 'Gainsbourg', '1971-07-21', 'French'),
-- ('Denzel', 'Washington', '1954-12-28', 'American'),
-- ('Hugh', 'Grant', '1960-09-09', 'British'),
-- ('Isabelle', 'Huppert', '1953-03-16', 'French'),
-- ('Robert', 'Downey Jr.', '1965-04-04', 'American'),
-- ('Keira', 'Knightley', '1985-03-26', 'British'),
-- ('Sophie', 'Marceau', '1966-11-17', 'French'),
-- ('Morgan', 'Freeman', '1937-06-01', 'American'),
-- ('Christian', 'Bale', '1974-01-30', 'British'),
-- ('Gérard', 'Depardieu', '1948-12-27', 'French'),
-- ('Johnny', 'Depp', '1963-06-09', 'American'),
-- ('Emma', 'Stone', '1988-11-06', 'American'),
-- ('Jean-Paul', 'Belmondo', '1933-04-09', 'French'),
-- ('Colin', 'Firth', '1960-09-10', 'British'),
-- ('Juliette', 'Binoche', '1964-03-09', 'French'),
-- ('Matthew', 'McConaughey', '1969-11-04', 'American'),
-- ('Michael', 'Caine', '1933-03-14', 'British'),
-- ('Audrey', 'Tautou', '1976-08-09', 'French'),
-- ('Will', 'Smith', '1968-09-25', 'American'),
-- ('Benedict', 'Cumberbatch', '1976-07-19', 'British'),
-- ('François', 'Cluzet', '1955-09-21', 'French'),
-- ('Tom', 'Hanks', '1956-07-09', 'American'),
-- ('Sean', 'Connery', '1930-08-25', 'British'),
-- ('Jean', 'Reno', '1948-07-30', 'French'),
-- ('Chris', 'Evans', '1981-06-13', 'American'),
-- ('Gary', 'Oldman', '1958-03-21', 'British'),
-- ('Omar', 'Sy', '1978-01-20', 'French'),
-- ('Joaquin', 'Phoenix', '1974-10-28', 'American'),
-- ('Daniel', 'Day-Lewis', '1957-04-29', 'British'),
-- ('Mathieu', 'Amalric', '1965-10-25', 'French'),
-- ('George', 'Clooney', '1961-05-06', 'American'),
-- ('Anthony', 'Hopkins', '1937-12-31', 'British'),
-- ('Jean-Louis', 'Trintignant', '1930-12-11', 'French'),
-- ('Mark', 'Ruffalo', '1967-11-22', 'American'),
-- ('Timothy', 'Spall', '1957-02-27', 'British'),
-- ('Alain', 'Delon', '1935-11-08', 'French'),
-- ('Harrison', 'Ford', '1942-07-13', 'American'),
-- ('Alan', 'Rickman', '1946-02-21', 'British'),
-- ('Romain', 'Duris', '1974-05-28', 'French'),
-- ('Al', 'Pacino', '1940-04-25', 'American'),
-- ('Tom', 'Hardy', '1977-09-15', 'British');

-- -- Insertion dans la table Movie
-- INSERT INTO Blockbusters_Simplon.movie (title, release_year, duration, summary, poster, teaser, director_id, gender_id) VALUES
-- ('Le Cinquième Élément', 1997, 126, 'A sci-fi adventure where a taxi driver helps save Earth.', 'poster_fifth_element.jpg', 'teaser_fifth_element.mp4', 1, 5),
-- ('Dunkirk', 2017, 106, 'The WWII evacuation of Dunkirk told from land, sea, and air perspectives.', 'poster_dunkirk.jpg', 'teaser_dunkirk.mp4', 2, 3),
-- ('E.T. the Extra-Terrestrial', 1982, 115, 'A boy befriends an alien stranded on Earth.', 'poster_et.jpg', 'teaser_et.mp4', 3, 2),
-- ('Amélie', 2001, 122, 'A quirky French girl helps others in her neighborhood.', 'poster_amelie.jpg', 'teaser_amelie.mp4', 4, 2),
-- ('Taxi Driver', 1976, 114, 'A lonely veteran works as a cab driver and struggles with alienation.', 'poster_taxi_driver.jpg', 'teaser_taxi_driver.mp4', 5, 4),
-- ('Gladiator', 2000, 155, 'A betrayed Roman general seeks vengeance in the arena.', 'poster_gladiator.jpg', 'teaser_gladiator.mp4', 6, 3),
-- ('Swimming Pool', 2003, 102, 'A writer experiences mystery while on holiday in France.', 'poster_swimming_pool.jpg', 'teaser_swimming_pool.mp4', 7, 4),
-- ('Pulp Fiction', 1994, 154, 'Interwoven tales of crime in Los Angeles.', 'poster_pulp_fiction.jpg', 'teaser_pulp_fiction.mp4', 8, 4),
-- ('Sherlock Holmes', 2009, 128, 'The famous detective uncovers a dark conspiracy in London.', 'poster_sherlock.jpg', 'teaser_sherlock.mp4', 9, 5),
-- ('A Prophet', 2009, 155, 'A young Arab man rises in the ranks of the prison system.', 'poster_prophet.jpg', 'teaser_prophet.mp4', 10, 4),
-- ('Avatar', 2009, 162, 'A paraplegic ex-marine embarks on a mission on the planet Pandora.', 'poster_avatar.jpg', 'teaser_avatar.mp4', 11, 5),
-- ('Slumdog Millionaire', 2008, 120, 'A poor young man answers questions on a quiz show for love.', 'poster_slumdog.jpg', 'teaser_slumdog.mp4', 12, 2),
-- ('The Pianist', 2002, 150, 'A Polish Jewish musician struggles to survive the Holocaust.', 'poster_pianist.jpg', 'teaser_pianist.mp4', 13, 3),
-- ('Fight Club', 1999, 139, 'An insomniac office worker forms an underground fight club.', 'poster_fight_club.jpg', 'teaser_fight_club.mp4', 14, 4),
-- ('I, Daniel Blake', 2016, 100, 'A carpenter fights for welfare in the UK.', 'poster_daniel_blake.jpg', 'teaser_daniel_blake.mp4', 15, 3),
-- ('Breathless', 1960, 90, 'A French film about a petty criminal and his American girlfriend.', 'poster_breathless.jpg', 'teaser_breathless.mp4', 16, 4),
-- ('Beetlejuice', 1988, 92, 'A dead couple haunts their old house with an eccentric spirit.', 'poster_beetlejuice.jpg', 'teaser_beetlejuice.mp4', 17, 2),
-- ('Psycho', 1960, 109, 'A secretary steals money and hides at a secluded motel.', 'poster_psycho.jpg', 'teaser_psycho.mp4', 18, 4),
-- ('Le Boucher', 1970, 93, 'A small-town butcher becomes involved with a schoolteacher.', 'poster_boucher.jpg', 'teaser_boucher.mp4', 19, 4),
-- ('Million Dollar Baby', 2004, 132, 'A hardened boxing trainer helps an underdog female fighter.', 'poster_million_dollar.jpg', 'teaser_million_dollar.mp4', 20, 3),
-- ('We Need to Talk About Kevin', 2011, 112, 'A mother grapples with raising a troubled child.', 'poster_kevin.jpg', 'teaser_kevin.mp4', 21, 4),
-- ('The Hairdressers Husband', 1990, 82, 'A French man obsesses over marrying a hairdresser.', 'poster_hairdresser.jpg', 'teaser_hairdresser.mp4', 22, 2),
-- ('Malcolm X', 1992, 202, 'A biographical film about the African-American activist.', 'poster_malcolm_x.jpg', 'teaser_malcolm_x.mp4', 23, 3),
-- ('1917', 2019, 119, 'Two British soldiers on a dangerous mission during WWI.', 'poster_1917.jpg', 'teaser_1917.mp4', 24, 3),
-- ('Eternal Sunshine of the Spotless Mind', 2004, 108, 'A man undergoes a procedure to erase memories of his ex.', 'poster_eternal_sunshine.jpg', 'teaser_eternal_sunshine.mp4', 25, 4),
-- ('The Grand Budapest Hotel', 2014, 99, 'A hotel concierge is implicated in a murder mystery.', 'poster_grand_budapest.jpg', 'teaser_grand_budapest.mp4', 26, 4),
-- ('My Beautiful Laundrette', 1985, 97, 'A British-Pakistani man opens a laundromat in London.', 'poster_laundrette.jpg', 'teaser_laundrette.mp4', 27, 3),
-- ('The Fire Within', 1963, 108, 'A man reflects on his life while on the verge of suicide.', 'poster_fire_within.jpg', 'teaser_fire_within.mp4', 28, 4),
-- ('Stagecoach', 1939, 96, 'A diverse group of passengers faces hardship on a journey.', 'poster_stagecoach.jpg', 'teaser_stagecoach.mp4', 29, 3),
-- ('Happy-Go-Lucky', 2008, 118, 'A cheerful schoolteacher faces challenges with optimism.', 'poster_happy_go_lucky.jpg', 'teaser_happy_go_lucky.mp4', 30, 2);


-- -- Insertion dans la table Favorites
-- INSERT INTO Blockbusters_Simplon.favorites (movie_id, user_id) VALUES 
-- (1, 1),
-- (2, 1),
-- (3, 2),
-- (4, 3),
-- (5, 2),
-- (6, 1),
-- (7, 2),
-- (8, 3),
-- (9, 1),
-- (10, 2);


-- -- Insertion dans la table Reviews
-- INSERT INTO Blockbusters_Simplon.reviews (rate, comments, date_of_comms, user_id, movie_id) VALUES 
-- (4.5, 'Amazing movie!', '2023-01-01', 1, 1),
-- (5.0, 'A masterpiece!', '2023-02-15', 2, 2),
-- (4.8, 'Highly recommended.', '2023-03-10', 3, 3),
-- (3.5, 'Enjoyed it but had some flaws.', '2023-04-12', 1, 4),
-- (4.7, 'Incredible storytelling!', '2023-05-18', 2, 5),
-- (4.9, 'One of the best films ever made.', '2023-06-21', 3, 6),
-- (4.0, 'Worth a watch!', '2023-07-10', 1, 7),
-- (3.8, 'Quite entertaining.', '2023-08-05', 2, 8),
-- (4.6, 'Loved the visuals!', '2023-09-09', 3, 9),
-- (5.0, 'A true classic.', '2023-10-20', 1, 10);

-- -- Insertion dans la table movie_director
-- INSERT INTO Blockbusters_Simplon.movie_director (movie_id, director_id) VALUES 
-- (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 4),
-- (5, 5),
-- (6, 6),
-- (7, 7),
-- (8, 8),
-- (9, 9),
-- (10, 10),
-- (11, 11),
-- (12, 12),
-- (13, 13),
-- (14, 14),
-- (15, 15),
-- (16, 16),
-- (17, 17),
-- (18, 18),
-- (19, 19),
-- (20, 20),
-- (21, 21),
-- (22, 22),
-- (23, 23),
-- (24, 24),
-- (25, 25),
-- (26, 26),
-- (27, 27),
-- (28, 28),
-- (29, 29),
-- (30, 30);

-- -- Insertion dans la table movie_actor
-- INSERT INTO Blockbusters_Simplon.movie_actor (movie_id, actor_id, is_main_actor) VALUES 
-- (1, 1, TRUE),
-- (1, 2, FALSE),
-- (2, 3, TRUE),
-- (2, 4, FALSE),
-- (3, 5, TRUE),
-- (3, 6, FALSE),
-- (4, 7, TRUE),
-- (4, 8, FALSE),
-- (5, 9, TRUE),
-- (5, 10, FALSE),
-- (6, 11, TRUE),
-- (6, 12, FALSE),
-- (7, 13, TRUE),
-- (7, 14, FALSE),
-- (8, 15, TRUE),
-- (8, 16, FALSE),
-- (9, 17, TRUE),
-- (9, 18, FALSE),
-- (10, 19, TRUE),
-- (10, 20, FALSE),
-- (11, 21, TRUE),
-- (11, 22, FALSE),
-- (12, 23, TRUE),
-- (12, 24, FALSE),
-- (13, 25, TRUE),
-- (13, 26, FALSE),
-- (14, 27, TRUE),
-- (14, 28, FALSE),
-- (15, 29, TRUE),
-- (15, 30, FALSE);



-- Création de la base de données
DROP DATABASE IF EXISTS movizz;
CREATE DATABASE movizz

-- Table : Utilisateurs
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT
);

-- Table : Films
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    duration INT, -- Durée en minutes
    poster_url VARCHAR(255), -- URL de l'affiche
    trailer_url VARCHAR(255), -- URL de la bande-annonce
);

-- Table : Séries
CREATE TABLE series (
    series_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    poster_url VARCHAR(255),
);

-- Table : Genres
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Table : Association Films <-> Genres
CREATE TABLE movie_genres (
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

-- Table : Association Séries <-> Genres
CREATE TABLE series_genres (
    series_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (series_id, genre_id),
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

-- Table : Épisodes des séries
-- CREATE TABLE episodes (
--     episode_id INT AUTO_INCREMENT PRIMARY KEY,
--     series_id INT NOT NULL,
--     season_number INT NOT NULL,
--     episode_number INT NOT NULL,
--     title VARCHAR(255),
--     duration INT, -- Durée en minutes
--     release_date DATE,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
-- );

-- Table : Commentaires
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    movie_id INT, -- Null si c'est pour une série
    series_id INT, -- Null si c'est pour un film
    created_at DATETIME DEFAULT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
);

-- Table : Historique des vues
CREATE TABLE views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT, -- Null si c'est une série
    episode_id INT, -- Null si c'est un film
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE
);

-- Table : Favoris
CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT,
    series_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE
);


INSERT INTO users (username, email, password_hash, created_at) VALUES
('admin', 'admin@example.com', 'hashed_admin_password', NOW()), -- Admin
('user1', 'user1@example.com', 'hashed_password1', NOW()),
('user2', 'user2@example.com', 'hashed_password2', NOW()),
('user3', 'user3@example.com', 'hashed_password3', NOW()),
('user4', 'user4@example.com', 'hashed_password4', NOW()),
('user5', 'user5@example.com', 'hashed_password5', NOW()),
('user6', 'user6@example.com', 'hashed_password6', NOW()),
('user7', 'user7@example.com', 'hashed_password7', NOW()),
('user8', 'user8@example.com', 'hashed_password8', NOW()),
('user9', 'user9@example.com', 'hashed_password9', NOW()),
('user10', 'user10@example.com', 'hashed_password10', NOW()),
('user11', 'user11@example.com', 'hashed_password11', NOW()),
('user12', 'user12@example.com', 'hashed_password12', NOW()),
('user13', 'user13@example.com', 'hashed_password13', NOW()),
('user14', 'user14@example.com', 'hashed_password14', NOW()),
('user15', 'user15@example.com', 'hashed_password15', NOW()),
('user16', 'user16@example.com', 'hashed_password16', NOW()),
('user17', 'user17@example.com', 'hashed_password17', NOW()),
('user18', 'user18@example.com', 'hashed_password18', NOW()),
('user19', 'user19@example.com', 'hashed_password19', NOW()),
('user20', 'user20@example.com', 'hashed_password20', NOW());

INSERT INTO movies (title, description, release_date, duration, poster_url, trailer_url) VALUES
('Inception', 'Un voleur qui pénètre les rêves pour voler des secrets.', '2010-07-16', 148, 'https://example.com/inception.jpg', 'https://example.com/inception-trailer.mp4'),
('The Matrix', 'Un programmeur découvre la vérité sur sa réalité.', '1999-03-31', 136, 'https://example.com/matrix.jpg', 'https://example.com/matrix-trailer.mp4'),
('Interstellar', 'Un voyage spatial pour sauver l’humanité.', '2014-11-07', 169, 'https://example.com/interstellar.jpg', 'https://example.com/interstellar-trailer.mp4'),
('Avatar', 'Un soldat sur une planète extraterrestre.', '2009-12-18', 162, 'https://example.com/avatar.jpg', 'https://example.com/avatar-trailer.mp4'),
('Titanic', 'Une histoire d’amour sur un bateau légendaire.', '1997-12-19', 195, 'https://example.com/titanic.jpg', 'https://example.com/titanic-trailer.mp4'),
('Joker', 'Origines du célèbre vilain.', '2019-10-04', 122, 'https://example.com/joker.jpg', 'https://example.com/joker-trailer.mp4'),
('The Dark Knight', 'Le chevalier noir affronte le Joker.', '2008-07-18', 152, 'https://example.com/dark-knight.jpg', 'https://example.com/dark-knight-trailer.mp4'),
('Pulp Fiction', 'Histoires entrecroisées de personnages atypiques.', '1994-10-14', 154, 'https://example.com/pulp-fiction.jpg', 'https://example.com/pulp-fiction-trailer.mp4'),
('The Godfather', 'La saga d’une famille mafieuse.', '1972-03-24', 175, 'https://example.com/godfather.jpg', 'https://example.com/godfather-trailer.mp4'),
('Shawshank Redemption', 'L’évasion d’un innocent emprisonné.', '1994-09-23', 142, 'https://example.com/shawshank.jpg', 'https://example.com/shawshank-trailer.mp4'),
('Forrest Gump', 'La vie extraordinaire de Forrest.', '1994-07-06', 142, 'https://example.com/forrest-gump.jpg', 'https://example.com/forrest-gump-trailer.mp4'),
('Fight Club', 'Un groupe secret de combat.', '1999-10-15', 139, 'https://example.com/fight-club.jpg', 'https://example.com/fight-club-trailer.mp4'),
('The Lion King', 'Le parcours d’un lion nommé Simba.', '1994-06-24', 88, 'https://example.com/lion-king.jpg', 'https://example.com/lion-king-trailer.mp4'),
('The Avengers', 'Des super-héros unissent leurs forces.', '2012-05-04', 143, 'https://example.com/avengers.jpg', 'https://example.com/avengers-trailer.mp4'),
('Frozen', 'Deux sœurs et des pouvoirs de glace.', '2013-11-27', 102, 'https://example.com/frozen.jpg', 'https://example.com/frozen-trailer.mp4'),
('Harry Potter', 'Un jeune sorcier découvre ses pouvoirs.', '2001-11-16', 152, 'https://example.com/harry-potter.jpg', 'https://example.com/harry-potter-trailer.mp4'),
('Star Wars', 'Une saga intergalactique.', '1977-05-25', 121, 'https://example.com/star-wars.jpg', 'https://example.com/star-wars-trailer.mp4'),
('The Hobbit', 'Un voyage inattendu.', '2012-12-14', 169, 'https://example.com/hobbit.jpg', 'https://example.com/hobbit-trailer.mp4'),
('Black Panther', 'Un roi africain et ses responsabilités.', '2018-02-16', 134, 'https://example.com/black-panther.jpg', 'https://example.com/black-panther-trailer.mp4'),
('Wonder Woman', 'Une guerrière amazone découvre le monde.', '2017-06-02', 141, 'https://example.com/wonder-woman.jpg', 'https://example.com/wonder-woman-trailer.mp4');

INSERT INTO series (title, description, release_date, poster_url) VALUES
('Breaking Bad', 'Un professeur de chimie devient fabricant de drogue.', '2008-01-20', 'https://example.com/breaking-bad.jpg'),
('Stranger Things', 'Un groupe d’amis découvre un monde parallèle.', '2016-07-15', 'https://example.com/stranger-things.jpg'),
('The Witcher', 'Un sorceleur chasse les monstres pour gagner sa vie.', '2019-12-20', 'https://example.com/the-witcher.jpg'),
('Game of Thrones', 'Des familles se disputent le trône de fer.', '2011-04-17', 'https://example.com/game-of-thrones.jpg'),
('The Mandalorian', 'Un chasseur de primes dans l’univers Star Wars.', '2019-11-12', 'https://example.com/mandalorian.jpg'),
('The Office', 'La vie d’employés dans un bureau.', '2005-03-24', 'https://example.com/office.jpg'),
('Friends', 'Les aventures de six amis.', '1994-09-22', 'https://example.com/friends.jpg'),
('Sherlock', 'Les enquêtes du détective Sherlock Holmes.', '2010-07-25', 'https://example.com/sherlock.jpg'),
('Narcos', 'La montée et la chute de Pablo Escobar.', '2015-08-28', 'https://example.com/narcos.jpg'),
('Vikings', 'La vie et les conquêtes des vikings.', '2013-03-03', 'https://example.com/vikings.jpg'),
('Westworld', 'Un parc d’attractions futuriste pour adultes.', '2016-10-02', 'https://example.com/westworld.jpg'),
('The Boys', 'Des anti-héros affrontent les super-héros corrompus.', '2019-07-26', 'https://example.com/the-boys.jpg'),
('Lucifer', 'Le diable ouvre un club à Los Angeles.', '2016-01-25', 'https://example.com/lucifer.jpg'),
('Arrow', 'Un justicier masqué avec un arc.', '2012-10-10', 'https://example.com/arrow.jpg'),
('The Flash', 'Un scientifique acquiert une super vitesse.', '2014-10-07', 'https://example.com/flash.jpg'),
('Peaky Blinders', 'Les aventures d’un gang en Angleterre.', '2013-09-12', 'https://example.com/peaky-blinders.jpg'),
('House of the Dragon', 'La maison Targaryen avant Game of Thrones.', '2022-08-21', 'https://example.com/house-dragon.jpg'),
('The Crown', 'La vie de la reine Elizabeth II.', '2016-11-04', 'https://example.com/the-crown.jpg'),
('The Umbrella Academy', 'Une famille de super-héros dysfonctionnelle.', '2019-02-15', 'https://example.com/umbrella-academy.jpg'),
('Euphoria', 'La vie compliquée d’adolescents.', '2019-06-16', 'https://example.com/euphoria.jpg');

INSERT INTO genres (name) VALUES
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

INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1, 3), (1, 6), -- Inception - Science-Fiction, Thriller
(2, 3), (2, 1), -- The Matrix - Science-Fiction, Action
(3, 3), (3, 4), -- Interstellar - Science-Fiction, Drame
(4, 3), (4, 2), -- Avatar - Science-Fiction, Aventure
(5, 4), (5, 9), -- Titanic - Drame, Romance
(6, 4), (6, 6), -- Joker - Drame, Thriller
(7, 1), (7, 6), -- The Dark Knight - Action, Thriller
(8, 4), (8, 6), -- Pulp Fiction - Drame, Thriller
(9, 4), (9, 12), -- The Godfather - Drame, Crime
(10, 4), -- Shawshank Redemption - Drame
(11, 4), (11, 9), -- Forrest Gump - Drame, Romance
(12, 4), (12, 6), -- Fight Club - Drame, Thriller
(13, 8), (13, 14), -- The Lion King - Animation, Famille
(14, 1), (14, 3), -- The Avengers - Action, Science-Fiction
(15, 8), (15, 14), -- Frozen - Animation, Famille
(16, 3), (16, 5), -- Harry Potter - Science-Fiction, Fantastique
(17, 3), (17, 2), -- Star Wars - Science-Fiction, Aventure
(18, 3), (18, 2), -- The Hobbit - Science-Fiction, Aventure
(19, 1), (19, 4), -- Black Panther - Action, Drame
(20, 1), (20, 2); -- Wonder Woman - Action, Aventure

INSERT INTO series_genres (series_id, genre_id) VALUES
(1, 4), (1, 12), -- Breaking Bad - Drame, Crime
(2, 3), (2, 5), -- Stranger Things - Science-Fiction, Fantastique
(3, 5), (3, 1), -- The Witcher - Fantastique, Action
(4, 4), (4, 5), -- Game of Thrones - Drame, Fantastique
(5, 3), (5, 2), -- The Mandalorian - Science-Fiction, Aventure
(6, 7), (6, 4), -- The Office - Comédie, Drame
(7, 7), (7, 4), -- Friends - Comédie, Drame
(8, 6), (8, 11), -- Sherlock - Mystère, Thriller
(9, 4), (9, 12), -- Narcos - Drame, Crime
(10, 2), (10, 5), -- Vikings - Aventure, Fantastique
(11, 3), (11, 4), -- Westworld - Science-Fiction, Drame
(12, 1), (12, 6), -- The Boys - Action, Thriller
(13, 4), (13, 6), -- Lucifer - Drame, Thriller
(14, 1), (14, 2), -- Arrow - Action, Aventure
(15, 3), (15, 1), -- The Flash - Science-Fiction, Action
(16, 4), (16, 12), -- Peaky Blinders - Drame, Crime
(17, 15), (17, 4), -- House of the Dragon - Historique, Drame
(18, 4), (18, 15), -- The Crown - Drame, Historique
(19, 5), (19, 3), -- The Umbrella Academy - Fantastique, Science-Fiction
(20, 4), (20, 11); -- Euphoria - Drame, Mystère

INSERT INTO comments (user_id, content, movie_id, series_id, created_at) VALUES
(1, 'Un chef-d’œuvre visuel.', 1, NULL, NOW()),
(2, 'Intrigue exceptionnelle, mais un peu longue.', 3, NULL, NOW()),
(3, 'Ce film m’a bouleversé.', 5, NULL, NOW()),
(4, 'Un peu surestimé selon moi.', 6, NULL, NOW()),
(5, 'Une expérience immersive et captivante.', 9, NULL, NOW()),
(6, 'La série est incroyable du début à la fin.', NULL, 1, NOW()),
(7, 'Personnages bien développés, mais une saison de trop.', NULL, 4, NOW()),
(8, 'C’est la meilleure série que j’ai vue.', NULL, 7, NOW()),
(9, 'L’univers est fascinant.', NULL, 2, NOW()),
(10, 'Les musiques et les décors sont époustouflants.', NULL, 10, NOW()),
(11, 'Un film divertissant, mais classique.', 11, NULL, NOW()),
(12, 'L’humour est excellent.', NULL, 6, NOW()),
(13, 'La tension est incroyable.', 20, NULL, NOW()),
(14, 'J’ai adoré les twists dans l’histoire.', 13, NULL, NOW()),
(15, 'Une série addictive.', NULL, 3, NOW()),
(16, 'Très bien réalisé, mais pas assez original.', NULL, 12, NOW()),
(17, 'Personnages trop clichés.', NULL, 8, NOW()),
(18, 'Un film d’animation magnifique.', 15, NULL, NOW()),
(19, 'La série devient meilleure avec chaque saison.', NULL, 9, NOW()),
(20, 'Un final qui laisse à désirer.', 18, NULL, NOW());

INSERT INTO views (user_id, movie_id, episode_id) VALUES
(1, 1, NULL),
(2, 3, NULL),
(3, 5, NULL),
(4, NULL, 1),
(5, NULL, 4),
(6, NULL, 7),
(7, NULL, 2),
(8, 9, NULL),
(9, NULL, 10),
(10, 11, NULL),
(11, NULL, 6),
(12, 20, NULL),
(13, 13, NULL),
(14, NULL, 3),
(15, NULL, 12),
(16, NULL, 8),
(17, 15, NULL),
(18, NULL, 9),
(19, 18, NULL),
(20, NULL, 5);

INSERT INTO favorites (user_id, movie_id, series_id) VALUES
(1, 1, NULL),
(2, 3, NULL),
(3, 5, NULL),
(4, NULL, 1),
(5, NULL, 4),
(6, NULL, 7),
(7, NULL, 2),
(8, 9, NULL),
(9, NULL, 10),
(10, 11, NULL),
(11, NULL, 6),
(12, 20, NULL),
(13, 13, NULL),
(14, NULL, 3),
(15, NULL, 12),
(16, NULL, 8),
(17, 15, NULL),
(18, NULL, 9),
(19, 18, NULL),
(20, NULL, 5);
