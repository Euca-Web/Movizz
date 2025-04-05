# Movizz

![Movizz Logo](https://raw.githubusercontent.com/Euca-Web/Movizz/f11d9d3a109bad3106e5282a0e4b44300309f5c3/code/client/src/assets/svg/logo.svg)

## 📚 Table des matières

1. [📋 Présentation du projet](#-présentation-du-projet)
2. [🚀 Installation et configuration](#-installation-et-configuration)
   - [Prérequis](#prérequis)
   - [Étapes d'installation](#étapes-dinstallation)
   - [Configuration de l'environnement local](#configuration-de-lenvironnement-local)
3. [🏗️ Architecture du projet](#️-architecture-du-projet)
   - [Structure des dossiers](#structure-des-dossiers)
   - [Backend (Serveur)](#backend-serveur)
   - [Frontend (Client)](#frontend-client)
4. [🔧 Utilisation](#-utilisation)
   - [Démarrage des services](#démarrage-des-services)
   - [Accès aux applications](#accès-aux-applications)
   - [Endpoints API principaux](#endpoints-api-principaux)
   - [Exemples d'utilisation de l'API](#exemples-dutilisation-de-lapi)
5. [🛠️ Déploiement en production](#️-déploiement-en-production)
6. [📊 Gestion des erreurs et surveillance](#-gestion-des-erreurs-et-surveillance)
7. [📝 Contribution](#-contribution)
8. [📚 Documentation supplémentaire](#-documentation-supplémentaire)

---

## 📋 Présentation du projet

Movizz est une bibliothèque de films inspirée de Pathé Home et MyMovix. Cette plateforme permet aux utilisateurs de découvrir des films et d'explorer leurs détails.

Le site sera initialement disponible en français, avec une version anglophone prévue dans les 6 mois à venir.

### Fonctionnalités principales

- **Utilisateurs** :
  - Consultation de films via une interface intuitive.
  - Recherche avancée par titre, genre, année de sortie, ou acteur.

- **Administrateurs** :
  - Gestion complète du catalogue de films (ajout, modification, suppression).
  - Modération des commentaires pour garantir un contenu approprié.
  - Supervision de l'expérience utilisateur (UX/UI) via des outils d'analyse intégrés.

---

## 🚀 Installation et configuration

### Prérequis

- [Node.js](https://nodejs.org/) (v23 ou supérieur)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-dépôt>
   cd Movizz
   ```

2. **Configuration de l'environnement avec Docker**
   ```bash
   # Démarrer les services (MySQL, MongoDB, client, serveur)
   docker compose -f docker-compose.dev.yaml up -d
   ```

3. **Configuration du serveur (backend)**
   ```bash
   # Accéder au conteneur du serveur
   docker exec -it movizz-server-1 bash
   
   # Dans le conteneur
   cd /app
   npm install
   npm run dev
   ```

4. **Configuration du client (frontend)**
   ```bash
   # Accéder au conteneur du client
   docker exec -it movizz-client-1 bash
   
   # Dans le conteneur
   cd /app
   npm install
   npm run dev
   ```

### Configuration de l'environnement local

- Créez un fichier `.env` dans les dossiers `code/server` et `code/client` avec les variables suivantes :

#### Backend (`code/server/.env`)
```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=VOTREMDP
MYSQL_PASSWORD=VOTREMDP
MYSQL_DATABASE=VOTRENOMDEBDD
JWT_SECRET=your_jwt_secret
```

#### Frontend (`code/client/.env`)
```env
VITE_API_URL=http://localhost:3000
```

---

## 🏗️ Architecture du projet

### Structure des dossiers

```
Movizz/
├── code/
│   ├── client/            # Frontend React + TypeScript + Vite
│   │   ├── src/           # Code source du client
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages principales de l'application
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── services/      # Services pour les appels API
│   │   ├── styles/        # Fichiers de styles globaux
│   │   └── ...
│   └── server/            # Backend Express + TypeScript
│       ├── src/           # Code source du serveur
│       │   ├── controller/  # Contrôleurs
│       │   ├── model/       # Modèles de données
│       │   ├── repository/  # Accès aux données
│       │   ├── router/      # Routeurs API
│       │   └── service/     # Services métier
│       ├── merise/        # Modèles de données (MCD, MLD)
│       ├── mongodb/       # Scripts MongoDB
│       └── mysql/         # Scripts MySQL
├── docker-compose.dev.yaml  # Configuration Docker pour le développement
├── mongodb-data/          # Données persistantes MongoDB
└── mysql-data/            # Données persistantes MySQL
```

---

### Backend (Serveur)

Le backend est construit avec **Node.js**, **Express**, et **TypeScript**. Il suit une architecture MVC (Modèle-Vue-Contrôleur) pour une séparation claire des responsabilités.

#### Fonctionnalités principales

- **Gestion des utilisateurs** :
  - Authentification via JWT (JSON Web Tokens).
  - Autorisation basée sur les rôles (utilisateur, administrateur).
  - Gestion des mots de passe avec chiffrement (bcrypt).

- **Gestion des films** :
  - CRUD complet (création, lecture, mise à jour, suppression).
  - Recherche avancée par titre, genre, année de sortie, ou acteur.
  - Gestion des images et des bandes-annonces via un service de stockage (ex. AWS S3).

- **Base de données** :
  - **MySQL** : Stockage des données structurées (utilisateurs, films).
  - **MongoDB** : Stockage des données non structurées (logs, historiques).

#### Points clés

- **Sécurité** :
  - Validation des données avec `Joi` ou `Zod`.
  - Protection contre les attaques XSS et CSRF.
  - Gestion des erreurs centralisée.

- **Performances** :
  - Mise en cache des requêtes fréquentes avec Redis.
  - Optimisation des requêtes SQL avec des index.

#### Scripts de création et de peuplement de la base

- **MySQL** : Fichier `code/server/mysql/script.dev.sql`
- **MongoDB** : Scripts dans `code/server/mongodb/`

---

### Frontend (Client)

Le frontend est construit avec **React**, **TypeScript**, et **Vite** pour une expérience utilisateur rapide et réactive.

#### Fonctionnalités principales

- **Interface utilisateur** :
  - Navigation fluide avec React Router.
  - Design responsive pour une compatibilité mobile et desktop.
  - Thème clair et sombre.

- **Gestion des utilisateurs** :
  - Connexion et inscription avec validation des formulaires.
  - Gestion des profils utilisateurs (modification des informations personnelles).

- **Interface d'administration** :
  - Tableau de bord pour gérer les films.
  - Statistiques sur les utilisateurs actifs et les films les plus populaires.

#### Points clés

- **Performances** :
  - Chargement rapide grâce à Vite.
  - Optimisation des assets (images, CSS, JS).

- **Modularité** :
  - Composants réutilisables pour une maintenance simplifiée.
  - Utilisation de hooks personnalisés pour la gestion des états.

---

## 🔧 Utilisation

### Démarrage des services

```bash
# Démarrer tous les services
docker compose -f docker-compose.dev.yaml up -d

# Arrêter tous les services
docker compose -f docker-compose.dev.yaml down
```

### Accès aux applications

- **Frontend** : http://localhost:5173
- **API Backend** : http://localhost:3000
- **MySQL** : localhost:3306 (user: root, password: root)
- **MongoDB** : localhost:27017 (user: root, password: root)

### Endpoints API principaux

- **GET /movies** : Liste tous les films.
- **GET /movies/:id** : Récupère les détails d'un film spécifique.
- **POST /movies** : Ajoute un nouveau film.
- **PUT /movies/:id** : Met à jour un film existant.
- **DELETE /movies/:id** : Supprime un film.

### Exemples d'utilisation de l'API

#### Exemple avec `curl`
```bash
curl -X GET http://localhost:3000/movies
```

---

## 🛠️ Déploiement en production

1. **Configurer les variables d'environnement** :
   - Créez un fichier `.env` pour le backend (`code/server/.env`) et le frontend (`code/client/.env`) avec les variables nécessaires (voir la section [Configuration de l'environnement local](#configuration-de-lenvironnement-local)).
   - Assurez-vous que les secrets (comme `JWT_SECRET` et les identifiants de base de données) sont sécurisés.

2. **Base de données** :
   - Exportez les scripts SQL fournis dans `code/server/mysql/script.test.sql` pour initialiser la base de données MySQL.
   - Configurez un serveur MySQL en production (par exemple, sur AWS RDS ou un autre service cloud).

3. **Backend** :
   - Construisez le projet backend avec TypeScript :
     ```bash
     cd code/server
     npm run build
     ```
   - Déployez les fichiers compilés (`dist/`) sur un serveur (par exemple, avec **PM2**, **Docker**, ou un service cloud comme AWS EC2 ou Heroku).

4. **Frontend** :
   - Construisez le projet frontend avec Vite :
     ```bash
     cd code/client
     npm run build
     ```
   - Déployez les fichiers générés dans le dossier `dist/` sur un service d'hébergement statique comme **Netlify**, **Vercel**, ou **AWS S3 avec CloudFront**.

5. **Reverse Proxy** :
   - Configurez un reverse proxy (par exemple, avec **NGINX** ou **Apache**) pour servir le frontend et rediriger les requêtes API vers le backend.

6. **Surveillance et logs** :
   - Configurez un outil de gestion des logs comme **Logrotate** ou un service cloud (ex. **Elastic Stack**, **Datadog**).
   - Activez la surveillance des performances avec des outils comme **UptimeRobot** ou **Pingdom**.

---

## 📊 Gestion des erreurs et surveillance

- **Gestion des erreurs** :
  - Implémentez un middleware centralisé dans le backend pour capturer et gérer les erreurs (déjà présent dans votre projet si vous utilisez Express).
  - Ajoutez des messages d'erreur clairs pour les utilisateurs et des logs détaillés pour les administrateurs.

- **Surveillance des logs** :
  - Utilisez un outil comme **Winston** pour centraliser les logs dans le backend.
  - Configurez un stockage persistant pour les logs (par exemple, un fichier ou un service cloud).

- **Monitoring des performances** :
  - Intégrez un outil comme **PM2** pour surveiller les processus Node.js en production.
  - Configurez des alertes pour détecter les anomalies (par exemple, des temps de réponse élevés ou des erreurs fréquentes).

- **Tests en production** :
  - Effectuez des tests réguliers des endpoints API avec des outils comme **Postman** ou **Newman**.
  - Surveillez les performances du frontend avec des outils comme **Lighthouse** ou **WebPageTest**.

---

## 📝 Contribution

Pour contribuer au projet, veuillez suivre les étapes suivantes :

1. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-fonctionnalité`).
2. Commiter vos changements (`git commit -m 'Ajout de fonctionnalité X'`).
3. Pousser la branche (`git push origin feature/nom-de-la-fonctionnalité`).
4. Ouvrir une Pull Request.

---

## 📚 Documentation supplémentaire

- **API Swagger** : Une documentation complète des endpoints est disponible à l'adresse : `http://localhost:3000/api-docs`.
- **Diagrammes UML** : Les diagrammes de classes et de séquence sont disponibles dans le dossier `docs/uml`.

