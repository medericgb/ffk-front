# FFK Front

Application web Next.js regroupant authentification, galerie photo Unsplash et système de favoris.

## Installation

### Prérequis

- **Node.js** 18+ 
- **pnpm** (recommandé) ou npm/yarn

### Étapes

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd ffk-front
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env.local` à la racine du projet :
   ```
   UNSPLASH_ACCESS_KEY=votre_clé_api_unsplash
   ```
   
   Pour obtenir une clé :
   - Créer un compte sur [Unsplash Developers](https://unsplash.com/developers)
   - Créer une application dans [Your Apps](https://unsplash.com/oauth/applications)
   - Copier l'**Access Key**

4. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```

5. **Ouvrir l'application**
   
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance le serveur de développement |
| `pnpm build` | Compile l'application pour la production |
| `pnpm start` | Lance l'application en mode production |
| `pnpm lint` | Exécute le linter ESLint |

## Comptes de test (authentification)

| Identifiant | Mot de passe | Statut |
|-------------|--------------|--------|
| muser1 | mpassword1 | Actif |
| muser2 | mpassword2 | Actif |
| muser3 | mpassword3 | Bloqué |

---

## Documentation technique

### Stack & Frameworks

- **Next.js 16** – Framework React avec App Router
- **React 19** – Bibliothèque UI
- **TypeScript** – Typage statique
- **Tailwind CSS v4** – Styles utilitaires
- **shadcn/ui** – Composants UI (Radix UI, CVA)

### Architecture

```
app/
├── api/likes/          # API REST pour les favoris
├── gallery/            # Page galerie Unsplash
├── login/              # Page de connexion
├── layout.tsx          # Layout global (nav, fonts)
└── page.tsx            # Page d'accueil

components/
├── login-form.tsx      # Formulaire de connexion
├── user-menu.tsx       # Menu utilisateur (déconnexion)
└── ui/                 # Composants shadcn

lib/
├── auth.ts             # Logique d'authentification
├── db.ts               # Stockage utilisateurs (localStorage)
├── likes.ts            # Client API favoris
└── unsplash.ts         # Client API Unsplash

data/
└── likes.json          # Persistance des favoris par utilisateur
```

### Choix techniques

#### Authentification
- **Stockage côté client** : `localStorage` pour la base utilisateurs (`lib/db.ts`)
- **Session** : `sessionStorage` + cookie `auth_user` pour persister la session
- **Validation** : Contrôles côté client avant soumission

#### Galerie Unsplash
- **API** : Endpoint `GET /photos` avec pagination (`page`, `per_page`)
- **Limites** : 12 photos par page, 10 pages max (120 images)
- **Clé API** : Variable `UNSPLASH_ACCESS_KEY` ou `ACCESS_KEY` en secours

#### Système de favoris (likes)
- **Persistance** : Fichier `data/likes.json` dans le codebase
- **Structure** : `{ [username]: { [photoId]: UnsplashPhoto } }`
- **API** : Routes GET et POST `/api/likes` pour lire et basculer les likes

#### UI / Design
- **Police globale** : Space Grotesk (next/font)
- **Thème** : Clair par défaut
- **Responsive** : Mobile-first, grille adaptative (1/2/3 colonnes)

### Variables d'environnement

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| `UNSPLASH_ACCESS_KEY` | Clé API Unsplash | Oui (pour la galerie) |
| `ACCESS_KEY` | Alternative pour Unsplash | Non |
