# Movizz

## À propos
Projet Simplon
Une bibliothèque de film du type Pathé Home combinée avec MyMovix.
Les utilisateurs auront la possibilité de pouvoir ajouter des commentaires et des notes sous les films répertoriés sur le site.
La partie ADMIN elle aura pour fonction d'ajouter les films dans un premier temps et de s'assurer que tout fonctionne bien d'un point de vu utilisateur, UX/UI etc etc.

Ce site sera dans un premier temps en français mais une version anglophone sera mise en ligne dans les 6 mois à venir.
Notre concurrence direct est asser vaste il suffit de prendre en compte tous les sites de type streaming ou qui répertories des films comme AlloCiné, mais ces sites contiennent pas mal de désavantages notamment pour le dernier cité. 

PathéHome
Avantages :
Large choix de films récents et variés​
Interface fluide, catégories et genres bien organisés​
Inconvénients :
Nécessite un abonnement pour accéder à certaines fonctionnalités​
Offre limitée pour les films plus anciens​

Allociné
Avantages :
Informations détaillées sur les films, acteurs et critiques​
Très bonne gestion des avis utilisateurs et des classements​
Inconvénients :
Publicité envahissante sur certaines pages​
Le design peut sembler saturé pour certains utilisateurs​

MyMovix
Avantages :
Large bibliothèque de films, y compris des classiques​
Accès à plusieurs genres et nouveautés​
Inconvénients :
Interface parfois difficile à naviguer​
Risque de contenus non officiels, ce qui peut être préoccupant​

## Fonctionnalités Principales

### Interface Utilisateur
- Support des thèmes clair/sombre avec persistance des préférences
- Navigation fluide et responsive
- Affichage optimisé des images avec chargement progressif
- Gestion intelligente des états de chargement
- Gestion centralisée des erreurs

## Architecture et Optimisations Techniques

### Backend (Serveur)

#### Pagination et Performance
- Mise en place d'une pagination pour les routes `/movie` et `/series`
  - Limite configurable du nombre d'éléments par page
  - Métadonnées de pagination (total, pages, etc.)
- Utilisation de requêtes SQL préparées pour la sécurité
- Optimisation des requêtes avec GROUP_CONCAT pour les genres

#### Sécurité et Validation
- Middleware de validation des paramètres
  - Validation des paramètres de pagination
  - Vérification des valeurs limites
- Gestion centralisée des erreurs
- Protection contre les injections SQL

#### Configuration de la Base de Données
- Pool de connexions MySQL optimisé
- Configuration via variables d'environnement
- Support de plusieurs environnements (dev, prod)

### Frontend (Client)

#### Gestion des Données
- Intégration de React Query pour :
  - Cache automatique des données (5 minutes)
  - Revalidation intelligente
  - Gestion optimisée des états de chargement
  - Conservation des données pendant les transitions

#### TypeScript et Typage
- Types stricts pour les réponses API
- Interfaces pour les modèles de données
- Meilleure sécurité de type et autocomplétion

#### Architecture et Organisation
- Services API centralisés
- Hooks personnalisés pour les requêtes
- Séparation claire des responsabilités

#### Composants Réutilisables
- `LazyImage` : Chargement optimisé des images
  - Placeholder pendant le chargement
  - Gestion des erreurs de chargement
  - Support du chargement progressif

- `ErrorBoundary` : Gestion globale des erreurs
  - Capture des erreurs React
  - Interface utilisateur pour les erreurs
  - Option de récupération après erreur

- `LoadingSpinner` : Indicateur de chargement
  - Plusieurs tailles disponibles
  - Animation fluide
  - Personnalisable via CSS

#### Gestion des Thèmes
- Système de thèmes clair/sombre
- Persistance des préférences utilisateur
- Variables CSS pour une cohérence visuelle
- Transition fluide entre les thèmes

#### React Query Integration
- Cache intelligent des données
  - Durée de validité : 5 minutes
  - Revalidation automatique
  - Gestion optimisée du stale-while-revalidate
- Retry automatique en cas d'échec
- Gestion des états de chargement et d'erreur

## Installation et Configuration

### Prérequis
- Node.js
- Docker et Docker Compose
- MySQL

### Démarrage
1. Cloner le repository
2. Lancer avec Docker Compose :
   ```bash
   docker-compose -f docker-compose.dev.yaml up
   ```
3. Accéder à l'application :
   - Frontend : http://localhost:5173
   - API : http://localhost:3000

### Variables d'Environnement
- `MYSQL_HOST` : Hôte MySQL
- `MYSQL_USER` : Utilisateur MySQL
- `MYSQL_PASSWORD` : Mot de passe MySQL
- `MYSQL_DATABASE` : Nom de la base de données
- `VITE_API_URL` : URL de l'API (côté client)
