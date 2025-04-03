# Sécuriser une Route API

## Côté Serveur

### 0. Middleware d'Authorization
- Créez un middleware pour vérifier la présence et la validité du token d'autorisation.
- Exemple :
  ```typescript
  class AuthorizationMiddleware {
      check(roles: string[]) {
          return (req, res, next) => {
              const authHeader = req.headers.authorization;
              if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  return res.status(401).json({ message: 'Unauthorized: No token provided' });
              }
              const token = authHeader.split(' ')[1];
              // Ajouter la logique de validation du token ici
              next();
          };
      }
  }
  ```

### 1. Ajouter le Middleware dans le Router
- Intégrez le middleware dans les routes nécessitant une autorisation.
- Exemple :
  ```typescript
  router.put('/protected-route', new AuthorizationMiddleware().check(['nom_admin']), controllerMethod);
  ```

### 2. Tester avec Flashpost
- **Étape 1** : Envoyez une requête `POST /auth` pour récupérer un token d'autorisation (par exemple, pour un utilisateur admin).
- **Étape 2** : Utilisez le token récupéré pour effectuer une requête `PUT` sur une route protégée en l'ajoutant dans les headers.

---

## Côté Client

### 4. Récupérer l'utilisateur avant `useEffect`
- Assurez-vous que les informations de l'utilisateur connecté sont disponibles avant d'exécuter un `useEffect`.
- Exemple :
  ```typescript
  const { user } = useContext(UserContext);
  ```

### 5. Récupérer le Token d'Autorisation avant la Requête HTTP
- Avant d'envoyer une requête HTTP, récupérez le token d'autorisation.
- Exemple :
  ```typescript
  const auth = await new SecurityAPI().auth(user);
  ```

### 6. Ajouter le Token lors de l'Appel
- Incluez le token dans les headers de la requête HTTP.
- Exemple :
  ```typescript
  const response = await new InstrumentalAPI().update(formData, auth.data.token);
  ```

### 7. Ajouter un Paramètre `token` dans la Fonction API
- Modifiez la fonction API pour inclure un paramètre `token: string` et ajoutez l'autorisation dans les headers.
- Exemple :
  ```typescript
  const updateData = async (data: any, token: string) => {
      const response = await axios.put('/protected-route', data, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
  };
  ```

---

## Bonnes Pratiques

1. **Validation des Tokens**
   - Utilisez une bibliothèque comme `jsonwebtoken` pour valider les tokens côté serveur.

2. **Gestion des Erreurs**
   - Implémentez une gestion cohérente des erreurs pour les cas où le token est manquant ou invalide.

3. **Sécurité**
   - Ne stockez jamais les tokens en clair dans le localStorage ou le sessionStorage. Utilisez des cookies sécurisés si possible.

4. **Tests**
   - Testez les routes protégées avec des outils comme Postman ou Flashpost pour valider le bon fonctionnement de l'authentification et de l'autorisation.
