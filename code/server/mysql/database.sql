-- Création de la base de données
DROP DATABASE IF EXISTS Movizz;
CREATE DATABASE Movizz;

-- Explication des paramètres utilisés dans les tables :
--
-- ENGINE=InnoDB :
--   - Moteur de stockage MySQL qui supporte les transactions ACID
--   - Permet le verrouillage au niveau des lignes (meilleure concurrence)
--   - Gère l'intégrité référentielle (clés étrangères)
--   - Assure la récupération des données après un crash
--
-- DEFAULT CHARSET=utf8mb4 :
--   - Permet de stocker TOUS les caractères Unicode (4 bytes par caractère)
--   - Support complet des émojis, caractères chinois, japonais, coréens
--   - Meilleur que 'utf8' qui est limité à 3 bytes par caractère
--
-- COLLATE=utf8mb4_unicode_ci :
--   - Définit comment MySQL compare et trie les caractères
--   - 'ci' signifie 'Case Insensitive' (insensible à la casse)
--   - Rend les recherches insensibles aux accents et à la casse
--   - Exemple : 'é' = 'e', 'A' = 'a' pour les recherches

-- Table : Utilisateurs
CREATE TABLE Movizz.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Genres
CREATE TABLE Movizz.gender (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Films
CREATE TABLE Movizz.movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    description TEXT,
    release_date DATE,
    duration INT COMMENT 'Durée en minutes',
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    views_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT INDEX idx_movie_search (title, original_title, description),
    INDEX idx_release_date (release_date),
    INDEX idx_rating (rating),
    INDEX idx_views (views_count)
    release_date DATE,
    duration INT COMMENT 'Durée en minutes',
    poster_url VARCHAR(255) COMMENT 'URL de l''affiche',
    trailer_url VARCHAR(255) COMMENT 'URL de la bande-annonce',
    director VARCHAR(255),
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_release_date (release_date),
    INDEX idx_rating (rating),
    FULLTEXT INDEX idx_search (title, original_title, description, director)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Séries
CREATE TABLE Movizz.series (
    series_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    description TEXT,
    release_date DATE,
    end_date DATE,
    number_of_seasons INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_release_date (release_date),
    FULLTEXT INDEX idx_search (title, original_title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Association Films <-> Genres
CREATE TABLE Movizz.movie_gender (
    movie_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (movie_id, gender_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE,
    INDEX idx_movie_gender (movie_id, gender_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Association Séries <-> Genres
CREATE TABLE Movizz.series_gender (
    series_id INT NOT NULL,
    gender_id INT NOT NULL,
    PRIMARY KEY (series_id, gender_id),
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id) ON DELETE CASCADE,
    INDEX idx_series_gender (series_id, gender_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Favoris Films
CREATE TABLE Movizz.movie_favorites (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    INDEX idx_user_movie (user_id, movie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table : Favoris Séries
CREATE TABLE Movizz.series_favorites (
    user_id INT NOT NULL,
    series_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, series_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (series_id) REFERENCES series(series_id) ON DELETE CASCADE,
    INDEX idx_user_series (user_id, series_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion des données de test

-- Insertion des genres
INSERT INTO Movizz.gender (name) VALUES 
('Action'),
('Science-Fiction'),
('Drame'),
('Comédie'),
('Aventure'),
('Animation'),
('Thriller'),
('Fantastique'),
('Horreur'),
('Romance');

-- Insertion des films
INSERT INTO Movizz.movies (title, original_title, description, release_date, duration, rating, poster_url, trailer_url) VALUES
('Inception', 'Inception', 'Dom Cobb est un voleur expérimenté dans l''art périlleux de l''extraction : sa spécialité consiste à s''approprier les secrets les plus précieux d''un individu pendant qu''il rêve.', '2010-07-21', 148, 8.8, '/posters/inception.jpg', '/trailers/inception.mp4'),
('Le Parrain', 'The Godfather', 'En 1945, à New York, les Corleone sont une des cinq familles de la mafia. Don Vito Corleone marie sa fille à un bookmaker.', '1972-03-15', 175, 9.2, '/posters/godfather.jpg', '/trailers/godfather.mp4'),
('Pulp Fiction', 'Pulp Fiction', 'L''odyssée sanglante et burlesque de petits malfrats dans la jungle de Hollywood.', '1994-10-14', 154, 8.9, '/posters/pulp_fiction.jpg', '/trailers/pulp_fiction.mp4'),
('Matrix', 'The Matrix', 'Programmeur anonyme dans un service administratif le jour, Thomas Anderson devient Neo la nuit venue.', '1999-03-31', 136, 8.7, '/posters/matrix.jpg', '/trailers/matrix.mp4'),
('Interstellar', 'Interstellar', 'Dans un futur proche, la Terre est devenue hostile pour l''homme. Les récoltes sont détruites peu à peu et l''humanité n''a plus beaucoup de temps à vivre.', '2014-11-05', 169, 8.6, '/posters/interstellar.jpg', '/trailers/interstellar.mp4'),
('Le Roi Lion', 'The Lion King', 'Sur les Hautes terres d''Afrique règne un lion tout-puissant, le roi Mufasa, que tous les hôtes de la jungle respectent et admirent.', '1994-06-15', 88, 8.5, '/posters/lion_king.jpg', '/trailers/lion_king.mp4'),
('Gladiator', 'Gladiator', 'Le général romain Maximus est le plus fidèle soutien de l''empereur Marc Aurèle, qu''il a conduit de victoire en victoire.', '2000-05-05', 155, 8.5, '/posters/gladiator.jpg', '/trailers/gladiator.mp4'),
('Les Évadés', 'The Shawshank Redemption', 'En 1947, Andy Dufresne, un jeune banquier, est condamné à la prison à vie pour le meurtre de sa femme et de son amant.', '1994-09-23', 142, 9.3, '/posters/shawshank.jpg', '/trailers/shawshank.mp4'),
('Forrest Gump', 'Forrest Gump', 'Quelques décennies d''histoire américaine, des années 1950 à la fin du XXème siècle, à travers le regard et l''étrange odyssée d''un homme simple et pur.', '1994-07-06', 142, 8.8, '/posters/forrest_gump.jpg', '/trailers/forrest_gump.mp4'),
('Le Seigneur des Anneaux', 'The Lord of the Rings', 'Dans ce chapitre de la trilogie, le jeune et timide Hobbit, Frodon Sacquet, hérite d''un anneau.', '2001-12-19', 178, 8.8, '/posters/lotr.jpg', '/trailers/lotr.mp4'),
('Fight Club', 'Fight Club', 'Le narrateur, sans identité précise, vit seul, travaille seul, dort seul, mange seul ses plateaux-repas pour une personne.', '1999-11-10', 139, 8.8, '/posters/fight_club.jpg', '/trailers/fight_club.mp4'),
('Titanic', 'Titanic', 'Southampton, 10 avril 1912. Le paquebot le plus grand et le plus moderne du monde, réputé pour son insubmersibilité, le Titanic, appareille pour son premier voyage.', '1997-12-19', 194, 7.8, '/posters/titanic.jpg', '/trailers/titanic.mp4'),
('Avatar', 'Avatar', 'Malgré sa paralysie, Jake Sully, un ancien marine immobilisé dans un fauteuil roulant, est resté un combattant au plus profond de son être.', '2009-12-16', 162, 7.8, '/posters/avatar.jpg', '/trailers/avatar.mp4'),
('Jurassic Park', 'Jurassic Park', 'Ne pas réveiller le chat qui dort... C''est ce que le milliardaire John Hammond aurait dû se rappeler avant de se lancer dans le clonage de dinosaures.', '1993-06-11', 127, 8.1, '/posters/jurassic_park.jpg', '/trailers/jurassic_park.mp4'),
('Le Silence des Agneaux', 'The Silence of the Lambs', 'Un psychopathe connu sous le nom de Buffalo Bill sème la terreur dans le Middle West en kidnappant et en assassinant de jeunes femmes.', '1991-02-14', 118, 8.6, '/posters/silence_lambs.jpg', '/trailers/silence_lambs.mp4'),
('Les Temps Modernes', 'Modern Times', 'Charlot est ouvrier dans une gigantesque usine. Il resserre quotidiennement des boulons.', '1936-02-05', 87, 8.5, '/posters/modern_times.jpg', '/trailers/modern_times.mp4'),
('Le Voyage de Chihiro', 'Spirited Away', 'Chihiro, une fillette de 10 ans, est en route vers sa nouvelle demeure en compagnie de ses parents.', '2001-07-20', 125, 8.6, '/posters/spirited_away.jpg', '/trailers/spirited_away.mp4'),
('Retour vers le futur', 'Back to the Future', 'En 1985, Marty McFly, adolescent de 17 ans, est l''ami de Doc Brown, un scientifique considéré comme fou.', '1985-07-03', 116, 8.5, '/posters/back_to_future.jpg', '/trailers/back_to_future.mp4'),
('Le Grand Bleu', 'The Big Blue', 'La rivalité de deux enfants, dans la mer, en Grèce, qui se poursuit lorsqu''ils sont adultes.', '1988-05-11', 168, 7.7, '/posters/big_blue.jpg', '/trailers/big_blue.mp4'),
('Amélie Poulain', 'Amelie', 'Amélie, une jeune serveuse dans un bar de Montmartre, passe son temps à observer les gens.', '2001-04-25', 122, 8.3, '/posters/amelie.jpg', '/trailers/amelie.mp4'),
('Blade Runner', 'Blade Runner', 'Dans les dernières années du 20ème siècle, des milliers d''hommes et de femmes partent à la conquête de l''espace.', '1982-06-25', 117, 8.1, '/posters/blade_runner.jpg', '/trailers/blade_runner.mp4'),
('Le Cinquième Élément', 'The Fifth Element', 'Au XXIIIème siècle, dans un univers étrange et coloré, où tout espoir de survie est impossible sans la découverte du Cinquième Élément.', '1997-05-07', 126, 7.7, '/posters/fifth_element.jpg', '/trailers/fifth_element.mp4'),
('Léon', 'Leon: The Professional', 'Léon est un tueur professionnel redoutable et insaisissable. Une petite fille de douze ans, Mathilda, vient trouver refuge chez lui.', '1994-09-14', 110, 8.5, '/posters/leon.jpg', '/trailers/leon.mp4'),
('Le Fabuleux Destin d''Amélie Poulain', 'Amelie', 'Amélie n''est pas une fille comme les autres. Elle a vu son poisson rouge sauter de son bocal.', '2001-04-25', 122, 8.3, '/posters/amelie.jpg', '/trailers/amelie.mp4'),
('Alien', 'Alien', 'Le vaisseau commercial Nostromo et son équipage, sept hommes et femmes, rentrent sur Terre avec une importante cargaison de minérai.', '1979-05-25', 117, 8.4, '/posters/alien.jpg', '/trailers/alien.mp4'),
('2001 : L''Odyssée de l''espace', '2001: A Space Odyssey', 'A l''époque préhistorique, une tribu de primates voit sa vie bouleversée par l''apparition d''un mystérieux monolithe noir.', '1968-04-03', 149, 8.3, '/posters/2001.jpg', '/trailers/2001.mp4'),
('Seven', 'Se7en', 'Pour conclure sa carrière, l''inspecteur Somerset, vieux flic blasé, tombe à sept jours de la retraite sur un criminel peu ordinaire.', '1995-09-22', 127, 8.6, '/posters/seven.jpg', '/trailers/seven.mp4'),
('Le Professionnel', 'Le Professionnel', 'Le commissaire Joss Beaumont est chargé par les services secrets français d''une mission spéciale en Afrique.', '1981-10-21', 108, 7.7, '/posters/professional.jpg', '/trailers/professional.mp4'),
('Metropolis', 'Metropolis', 'En 2026, Metropolis est une mégalopole organisée selon un système de castes.', '1927-01-10', 153, 8.3, '/posters/metropolis.jpg', '/trailers/metropolis.mp4');

-- Insertion des associations films-genres
INSERT INTO Movizz.movie_gender (movie_id, gender_id) VALUES
(1, 1), (1, 2), (1, 7), -- Inception: Action, SF, Thriller
(2, 5), (2, 3), -- Le Parrain: Crime, Drame
(3, 5), (3, 7), -- Pulp Fiction: Crime, Thriller
(4, 1), (4, 2), -- Matrix: Action, SF
(5, 2), (5, 3), -- Interstellar: SF, Drame
(6, 6), (6, 3), -- Le Roi Lion: Animation, Drame
(7, 1), (7, 3), -- Gladiator: Action, Drame
(8, 3), (8, 5), -- Les Évadés: Drame, Crime
(9, 3), (9, 4), -- Forrest Gump: Drame, Comédie
(10, 2), (10, 8), -- Le Seigneur des Anneaux: SF, Fantastique
(11, 3), (11, 7), -- Fight Club: Drame, Thriller
(12, 3), (12, 10), -- Titanic: Drame, Romance
(13, 1), (13, 2), -- Avatar: Action, SF
(14, 1), (14, 2), -- Jurassic Park: Action, SF
(15, 7), (15, 5), -- Le Silence des Agneaux: Thriller, Crime
(16, 4), -- Les Temps Modernes: Comédie
(17, 6), (17, 8), -- Le Voyage de Chihiro: Animation, Fantastique
(18, 1), (18, 2), (18, 4), -- Retour vers le futur: Action, SF, Comédie
(19, 3), (19, 10), -- Le Grand Bleu: Drame, Romance
(20, 4), (20, 10), -- Amélie Poulain: Comédie, Romance
(21, 2), (21, 7), -- Blade Runner: SF, Thriller
(22, 1), (22, 2), (22, 4), -- Le Cinquième Élément: Action, SF, Comédie
(23, 1), (23, 3), (23, 7), -- Léon: Action, Drame, Thriller
(24, 4), (24, 10), -- Le Fabuleux Destin d'Amélie Poulain: Comédie, Romance
(25, 2), (25, 9), -- Alien: SF, Horreur
(26, 2), (26, 3), -- 2001 L'Odyssée de l'espace: SF, Drame
(27, 5), (27, 7), -- Seven: Crime, Thriller
(28, 1), (28, 7), -- Le Professionnel: Action, Thriller
(29, 2), (29, 3); -- Metropolis: SF, Drame

-- Insertion des séries
INSERT INTO Movizz.series (title, original_title, description, release_date, end_date, number_of_seasons, poster_url, trailer_url) VALUES
('Breaking Bad', 'Breaking Bad', 'Un professeur de chimie atteint d''un cancer devient fabricant et vendeur de méthamphétamine pour assurer l''avenir financier de sa famille.', '2008-01-20', '2013-09-29', 5, '/posters/breaking_bad.jpg', '/trailers/breaking_bad.mp4'),
('Game of Thrones', 'Game of Thrones', 'Neuf familles nobles rivalisent pour le contrôle du Trône de Fer dans les sept royaumes de Westeros.', '2011-04-17', '2019-05-19', 8, '/posters/got.jpg', '/trailers/got.mp4'),
('Les Sopranos', 'The Sopranos', 'Un patron de la mafia du New Jersey tente de concilier sa vie familiale et ses activités criminelles.', '1999-01-10', '2007-06-10', 6, '/posters/sopranos.jpg', '/trailers/sopranos.mp4'),
('The Wire', 'The Wire', 'Une vision réaliste de la lutte entre la police et les trafiquants de drogue à Baltimore.', '2002-06-02', '2008-03-09', 5, '/posters/wire.jpg', '/trailers/wire.mp4'),
('Stranger Things', 'Stranger Things', 'Dans une petite ville, la disparition mystérieuse d''un jeune garçon met en émoi toute la communauté.', '2016-07-15', NULL, 4, '/posters/stranger_things.jpg', '/trailers/stranger_things.mp4'),
('The Crown', 'The Crown', 'L''histoire de la famille royale britannique à travers le règne de la reine Elizabeth II.', '2016-11-04', NULL, 6, '/posters/crown.jpg', '/trailers/crown.mp4'),
('Chernobyl', 'Chernobyl', 'L''histoire vraie de la catastrophe nucléaire de Tchernobyl en 1986.', '2019-05-06', '2019-06-03', 1, '/posters/chernobyl.jpg', '/trailers/chernobyl.mp4'),
('Black Mirror', 'Black Mirror', 'Une série d''anthologie explorant les conséquences inquiétantes de la technologie moderne.', '2011-12-04', NULL, 5, '/posters/black_mirror.jpg', '/trailers/black_mirror.mp4'),
('The Office', 'The Office', 'Le quotidien des employés de bureau de la société Dunder Mifflin.', '2005-03-24', '2013-05-16', 9, '/posters/office.jpg', '/trailers/office.mp4'),
('Friends', 'Friends', 'Les aventures de six amis vivant à New York.', '1994-09-22', '2004-05-06', 10, '/posters/friends.jpg', '/trailers/friends.mp4'),
('Fargo', 'Fargo', 'Une série d''anthologie criminelle se déroulant dans le Minnesota.', '2014-04-15', NULL, 5, '/posters/fargo.jpg', '/trailers/fargo.mp4'),
('True Detective', 'True Detective', 'Une série d''anthologie policière suivant différentes enquêtes criminelles.', '2014-01-12', NULL, 4, '/posters/true_detective.jpg', '/trailers/true_detective.mp4'),
('Westworld', 'Westworld', 'Dans un parc d''attractions futuriste, des androïdes se rebellent contre leurs créateurs.', '2016-10-02', '2022-08-14', 4, '/posters/westworld.jpg', '/trailers/westworld.mp4'),
('The Mandalorian', 'The Mandalorian', 'Les aventures d''un chasseur de primes mandalorien aux confins de la galaxie.', '2019-11-12', NULL, 3, '/posters/mandalorian.jpg', '/trailers/mandalorian.mp4'),
('Better Call Saul', 'Better Call Saul', 'L''histoire de la transformation de Jimmy McGill en Saul Goodman, l''avocat véreux de Breaking Bad.', '2015-02-08', '2022-08-15', 6, '/posters/better_call_saul.jpg', '/trailers/better_call_saul.mp4'),
('The Boys', 'The Boys', 'Dans un monde où les super-héros sont corrompus, une équipe de vengeurs tente de les arrêter.', '2019-07-26', NULL, 3, '/posters/the_boys.jpg', '/trailers/the_boys.mp4'),
('Dark', 'Dark', 'La disparition d''enfants dans une petite ville allemande révèle les relations entre quatre familles.', '2017-12-01', '2020-06-27', 3, '/posters/dark.jpg', '/trailers/dark.mp4'),
('The Witcher', 'The Witcher', 'Les aventures de Geralt de Riv, un chasseur de monstres mutant dans un monde médiéval fantastique.', '2019-12-20', NULL, 3, '/posters/witcher.jpg', '/trailers/witcher.mp4'),
('Peaky Blinders', 'Peaky Blinders', 'L''histoire d''une famille de gangsters dans le Birmingham de l''après-Première Guerre mondiale.', '2013-09-12', '2022-04-03', 6, '/posters/peaky_blinders.jpg', '/trailers/peaky_blinders.mp4'),
('La Casa de Papel', 'Money Heist', 'Un groupe de braqueurs exceptionnels attaque la Fabrique nationale de la monnaie et du timbre.', '2017-05-02', '2021-12-03', 5, '/posters/casa_papel.jpg', '/trailers/casa_papel.mp4'),
('Mindhunter', 'Mindhunter', 'Deux agents du FBI interrogent des tueurs en série incarcérés pour comprendre leur psychologie.', '2017-10-13', NULL, 2, '/posters/mindhunter.jpg', '/trailers/mindhunter.mp4'),
('Narcos', 'Narcos', 'L''histoire vraie des cartels de la drogue colombiens et des efforts pour les combattre.', '2015-08-28', '2017-09-01', 3, '/posters/narcos.jpg', '/trailers/narcos.mp4'),
('The Expanse', 'The Expanse', 'Dans un futur où l''humanité a colonisé le système solaire, un complot menace la paix.', '2015-12-14', '2022-01-14', 6, '/posters/expanse.jpg', '/trailers/expanse.mp4'),
('Mr. Robot', 'Mr. Robot', 'Un jeune programmeur travaillant comme ingénieur en sécurité le jour devient hacker la nuit.', '2015-06-24', '2019-12-22', 4, '/posters/mr_robot.jpg', '/trailers/mr_robot.mp4'),
('The Last of Us', 'The Last of Us', 'Dans un monde post-apocalyptique, un homme aguerri doit escorter une adolescente à travers les États-Unis.', '2023-01-15', NULL, 1, '/posters/last_of_us.jpg', '/trailers/last_of_us.mp4'),
('Band of Brothers', 'Band of Brothers', 'L''histoire vraie de la Easy Company pendant la Seconde Guerre mondiale.', '2001-09-09', '2001-11-04', 1, '/posters/band_of_brothers.jpg', '/trailers/band_of_brothers.mp4'),
('The Handmaid''s Tale', 'The Handmaid''s Tale', 'Dans une société dystopique, les femmes fertiles sont réduites en esclavage.', '2017-04-26', NULL, 5, '/posters/handmaids_tale.jpg', '/trailers/handmaids_tale.mp4'),
('Succession', 'Succession', 'Les luttes de pouvoir au sein d''une famille qui dirige un empire médiatique mondial.', '2018-06-03', '2023-05-28', 4, '/posters/succession.jpg', '/trailers/succession.mp4'),
('The Americans', 'The Americans', 'Deux espions du KGB se font passer pour un couple américain pendant la guerre froide.', '2013-01-30', '2018-05-30', 6, '/posters/americans.jpg', '/trailers/americans.mp4'),
('Oz', 'Oz', 'Le quotidien violent des détenus et des gardiens dans une prison expérimentale.', '1997-07-12', '2003-02-23', 6, '/posters/oz.jpg', '/trailers/oz.mp4');

-- Insertion des associations séries-genres
INSERT INTO Movizz.series_gender (series_id, gender_id) VALUES
(1, 3), (1, 5), -- Breaking Bad: Drame, Crime
(2, 3), (2, 8), -- Game of Thrones: Drame, Fantastique
(3, 3), (3, 5), -- Les Sopranos: Drame, Crime
(4, 3), (4, 5), -- The Wire: Drame, Crime
(5, 2), (5, 8), (5, 9), -- Stranger Things: SF, Fantastique, Horreur
(6, 3), -- The Crown: Drame
(7, 3), -- Chernobyl: Drame
(8, 2), (8, 7), -- Black Mirror: SF, Thriller
(9, 4), -- The Office: Comédie
(10, 4), (10, 10), -- Friends: Comédie, Romance
(11, 3), (11, 5), -- Fargo: Drame, Crime
(12, 3), (12, 5), (12, 7), -- True Detective: Drame, Crime, Thriller
(13, 2), (13, 7), -- Westworld: SF, Thriller
(14, 1), (14, 2), (14, 8), -- The Mandalorian: Action, SF, Fantastique
(15, 3), (15, 5), -- Better Call Saul: Drame, Crime
(16, 1), (16, 2), (16, 4), -- The Boys: Action, SF, Comédie
(17, 2), (17, 7), (17, 3), -- Dark: SF, Thriller, Drame
(18, 1), (18, 8), -- The Witcher: Action, Fantastique
(19, 3), (19, 5), -- Peaky Blinders: Drame, Crime
(20, 1), (20, 5), (20, 7), -- La Casa de Papel: Action, Crime, Thriller
(21, 3), (21, 5), (21, 7), -- Mindhunter: Drame, Crime, Thriller
(22, 3), (22, 5), -- Narcos: Drame, Crime
(23, 2), (23, 1), -- The Expanse: SF, Action
(24, 3), (24, 7), -- Mr. Robot: Drame, Thriller
(25, 1), (25, 3), (25, 9), -- The Last of Us: Action, Drame, Horreur
(26, 1), (26, 3), -- Band of Brothers: Action, Drame
(27, 3), (27, 2), -- The Handmaid's Tale: Drame, SF
(28, 3), (28, 4), -- Succession: Drame, Comédie
(29, 3), (29, 7), -- The Americans: Drame, Thriller
(30, 3), (30, 5); -- Oz: Drame, Crime

-- Insertion des utilisateurs de test
INSERT INTO Movizz.users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXht7XE3u'),
('jane_smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXht7XE3u');

-- Insertion des films
INSERT INTO Movizz.movies (title, description, release_date, duration, poster_url, trailer_url, director, rating) VALUES
('Inception', 'Un voleur expérimenté dans l''art de l''extraction de secrets exploite la technique de l''inception pour implanter une idée dans l''esprit d''un PDG.', '2010-07-16', 148, 'https://example.com/inception.jpg', 'https://example.com/inception-trailer.mp4', 'Christopher Nolan', 8.8),
('The Matrix', 'Un programmeur découvre que la réalité telle que nous la connaissons est une simulation créée par des machines.', '1999-03-31', 136, 'https://example.com/matrix.jpg', 'https://example.com/matrix-trailer.mp4', 'Lana et Lilly Wachowski', 8.7),
('Interstellar', 'Dans un futur proche, une équipe d''explorateurs voyage à travers un trou de ver pour sauver l''humanité.', '2014-11-05', 169, 'https://example.com/interstellar.jpg', 'https://example.com/interstellar-trailer.mp4', 'Christopher Nolan', 8.6),
('Le Seigneur des Anneaux', 'Un jeune hobbit entreprend un voyage épique pour détruire un anneau maléfique.', '2001-12-19', 178, 'https://example.com/lotr.jpg', 'https://example.com/lotr-trailer.mp4', 'Peter Jackson', 8.9),
('Avatar', 'Un marine paraplégique est envoyé sur Pandora où il se trouve tiraillé entre suivre ses ordres et protéger le monde qu''il considère désormais comme le sien.', '2009-12-16', 162, 'https://example.com/avatar.jpg', 'https://example.com/avatar-trailer.mp4', 'James Cameron', 7.8);

-- Insertion des séries
INSERT INTO Movizz.series (title, description, release_date, number_of_seasons, poster_url, trailer_url) VALUES
('Stranger Things', 'Dans une petite ville, un groupe d''enfants fait face à des forces surnaturelles et des expériences secrètes.', '2016-07-15', 4, 'https://example.com/stranger-things.jpg', 'https://example.com/stranger-things-trailer.mp4'),
('Breaking Bad', 'Un professeur de chimie atteint d''un cancer devient un baron de la drogue pour assurer l''avenir financier de sa famille.', '2008-01-20', 5, 'https://example.com/breaking-bad.jpg', 'https://example.com/breaking-bad-trailer.mp4'),
('Game of Thrones', 'Plusieurs familles nobles rivalisent pour le contrôle du Trône de Fer dans les sept royaumes.', '2011-04-17', 8, 'https://example.com/got.jpg', 'https://example.com/got-trailer.mp4');

-- Association des films avec leurs genres
INSERT INTO Movizz.movie_gender (movie_id, gender_id) VALUES
(1, 1), -- Inception - Action
(1, 2), -- Inception - Science-Fiction
(2, 1), -- Matrix - Action
(2, 2), -- Matrix - Science-Fiction
(3, 2), -- Interstellar - Science-Fiction
(3, 3), -- Interstellar - Drame
(4, 5), -- Le Seigneur des Anneaux - Aventure
(4, 8), -- Le Seigneur des Anneaux - Fantastique
(5, 2), -- Avatar - Science-Fiction
(5, 5); -- Avatar - Aventure

-- Association des séries avec leurs genres
INSERT INTO Movizz.series_gender (series_id, gender_id) VALUES
(1, 2), -- Stranger Things - Science-Fiction
(1, 9), -- Stranger Things - Horreur
(2, 3), -- Breaking Bad - Drame
(2, 7), -- Breaking Bad - Thriller
(3, 5), -- Game of Thrones - Aventure
(3, 8); -- Game of Thrones - Fantastique

-- Ajout de quelques favoris
INSERT INTO Movizz.movie_favorites (user_id, movie_id) VALUES
(1, 1), -- John aime Inception
(1, 3), -- John aime Interstellar
(2, 2), -- Jane aime Matrix
(2, 4); -- Jane aime Le Seigneur des Anneaux

INSERT INTO Movizz.series_favorites (user_id, series_id) VALUES
(1, 2), -- John aime Breaking Bad
(2, 1), -- Jane aime Stranger Things
(2, 3); -- Jane aime Game of Thrones
