-- Sélectionner toutes les colonnes d'une table
SELECT * FROM table_name;

-- Sélectionner des colonnes spécifiques d'une table
SELECT column1, column2 FROM table_name;

-- Filtrer les résultats avec une condition
SELECT * FROM table_name WHERE column1 = 'value';

-- Trier les résultats par une colonne
SELECT * FROM table_name ORDER BY column1 ASC;

-- Limiter le nombre de résultats retournés
SELECT * FROM table_name LIMIT 10;

-- Compter le nombre de lignes dans une table
SELECT COUNT(*) FROM table_name;

-- Grouper les résultats et appliquer une fonction d'agrégation
SELECT column1, COUNT(*) FROM table_name GROUP BY column1;

-- Utiliser une jointure entre deux tables
SELECT a.column1, b.column2
FROM table1 a
JOIN table2 b ON a.common_column = b.common_column;

-- Utiliser une condition avec plusieurs critères (AND)
SELECT * FROM table_name WHERE column1 = 'value1' AND column2 = 'value2';

-- Utiliser une condition avec plusieurs critères (OR)
SELECT * FROM table_name WHERE column1 = 'value1' OR column2 = 'value2';

-- Rechercher des valeurs dans une liste (IN)
SELECT * FROM table_name WHERE column1 IN ('value1', 'value2', 'value3');

-- Rechercher des valeurs correspondant à un motif (LIKE)
SELECT * FROM table_name WHERE column1 LIKE 'prefix%';

-- Exclure des résultats (NOT)
SELECT * FROM table_name WHERE NOT column1 = 'value';

-- Utiliser une sous-requête dans une condition
SELECT * FROM table_name WHERE column1 = (SELECT MAX(column1) FROM table_name);

-- Calculer une moyenne avec une fonction d'agrégation
SELECT AVG(column1) FROM table_name;

-- Trouver la valeur maximale d'une colonne
SELECT MAX(column1) FROM table_name;

-- Trouver la valeur minimale d'une colonne
SELECT MIN(column1) FROM table_name;

-- Supprimer les doublons dans les résultats
SELECT DISTINCT column1 FROM table_name;

