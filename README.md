# Movizz

![Movizz Logo](https://raw.githubusercontent.com/Euca-Web/Movizz/f11d9d3a109bad3106e5282a0e4b44300309f5c3/code/client/src/assets/svg/logo.svg)

## 📚 Table des matières

1. [📋 Présentation du projet](#-présentation-du-projet)
2. [🚀 Installation complète](#-installation-complète)
   - [Création des dossiers et installation des dépendances](#création-des-dossiers-et-installation-des-dépendances)
   - [Configuration de l'environnement](#configuration-de-lenvironnement)
   - [Démarrage des services](#démarrage-des-services)
3. [🏗️ Architecture du projet](#️-architecture-du-projet)
4. [🔧 Utilisation](#-utilisation)
5. [🛠️ Déploiement en production](#️-déploiement-en-production)
6. [📊 Gestion des erreurs et surveillance](#-gestion-des-erreurs-et-surveillance)
7. [📝 Contribution](#-contribution)
8. [📚 Documentation supplémentaire](#-documentation-supplémentaire)

---

## 📋 Présentation du projet

Movizz est une bibliothèque de films inspirée de Pathé Home et MyMovix. Cette plateforme permet aux utilisateurs de découvrir des films et d'explorer leurs détails.

Le site sera initialement disponible en français, avec une version anglophone prévue dans les 6 mois à venir.

---

## 🚀 Installation complète

### Création des dossiers et installation des dépendances

1. **Créer les dossiers du projet** :
   ```bash
   mkdir Movizz
   cd Movizz
   mkdir -p code/client code/server
   ```

2. **Initialiser le frontend avec Vite** :
   ```bash
   cd code/client
   npm create vite@latest .
   # Choisissez "React" et "TypeScript" comme options
   npm install
   ```

3. **Initialiser le backend avec Node.js et TypeScript** :
   ```bash
   cd ../server
   npm init -y
   npm install express typescript ts-node @types/node @types/express
   npx tsc --init
   ```

4. **Configurer Docker** :
   - Créez un fichier `docker-compose.dev.yaml` à la racine du projet :
     ```yaml
     version: '3.8'
     services:
       mysql:
         image: mysql:8.0
         container_name: movizz-mysql
         environment:
           MYSQL_ROOT_PASSWORD: root
           MYSQL_DATABASE: movizz
         ports:
           - "3306:3306"
         volumes:
           - ./mysql-data:/var/lib/mysql

       mongodb:
         image: mongo:5.0
         container_name: movizz-mongodb
         ports:
           - "27017:27017"
         volumes:
           - ./mongodb-data:/data/db

       server:
         build:
           context: ./code/server
         container_name: movizz-server
         ports:
           - "3000:3000"
         depends_on:
           - mysql
           - mongodb

       client:
         build:
           context: ./code/client
         container_name: movizz-client
         ports:
           - "5173:5173"
         depends_on:
           - server
     ```

5. **Configurer les scripts de base de données** :
   - Ajoutez vos scripts SQL dans `code/server/mysql/script.dev.sql`.
   - Ajoutez vos scripts MongoDB dans `code/server/mongodb/`.

---

### Configuration de l'environnement

1. **Créer les fichiers `.env`** :

#### Backend (`code/server/.env`)
```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=movizz
JWT_SECRET=your_jwt_secret
```

#### Frontend (`code/client/.env`)
```env
VITE_API_URL=http://localhost:3000
```

2. **Configurer TypeScript pour le backend** :
   - Modifiez le fichier `tsconfig.json` dans `code/server` :
     ```json
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "CommonJS",
         "outDir": "./dist",
         "rootDir": "./src",
         "strict": true,
         "esModuleInterop": true
       }
     }
     ```

3. **Créer les fichiers d'entrée** :
   - Backend (`code/server/src/index.ts`) :
     ```typescript
     import express from 'express';

     const app = express();
     const PORT = process.env.PORT || 3000;

     app.get('/', (req, res) => {
       res.send('Backend is running!');
     });

     app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```

   - Frontend (`code/client/src/main.tsx`) :
     ```tsx
     import React from 'react';
     import ReactDOM from 'react-dom/client';
     import App from './App';

     ReactDOM.createRoot(document.getElementById('root')!).render(
       <React.StrictMode>
         <App />
       </React.StrictMode>
     );
     ```

---

### Démarrage des services

1. **Démarrer les services Docker** :
   ```bash
   docker compose -f docker-compose.dev.yaml up -d
   ```

2. **Démarrer le backend** :
   ```bash
   cd code/server
   npm run dev
   ```

3. **Démarrer le frontend** :
   ```bash
   cd code/client
   npm run dev
   ```

4. **Accéder aux applications** :
   - Frontend : [http://localhost:5173](http://localhost:5173)
   - Backend : [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture du projet

### Structure des dossiers

```
Movizz/
├── code/
│   ├── client/            # Frontend React + TypeScript + Vite
│   └── server/            # Backend Express + TypeScript
├── docker-compose.dev.yaml  # Configuration Docker pour le développement
├── mongodb-data/          # Données persistantes MongoDB
└── mysql-data/            # Données persistantes MySQL
```

---

## 🔧 Utilisation

### Commandes utiles

- **Démarrer tous les services** :
  ```bash
  docker compose -f docker-compose.dev.yaml up -d
  ```

- **Arrêter tous les services** :
  ```bash
  docker compose -f docker-compose.dev.yaml down
  ```

---

## 🛠️ Déploiement en production

1. **Configurer les variables d'environnement** (voir la section [Configuration de l'environnement](#configuration-de-lenvironnement)).
2. **Construire le backend et le frontend** :
   ```bash
   cd code/server
   npm run build
   cd ../client
   npm run build
   ```
3. **Déployer les fichiers compilés** sur un serveur.

---

## 📚 Documentation supplémentaire

- **API Swagger** : [Documentation complète des endpoints](http://localhost:3000/api-docs).
- **Diagrammes UML** : Disponibles dans le dossier `docs/uml`.

