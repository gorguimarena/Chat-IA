# Chat IA - Application de Chat avec Intelligence Artificielle

Une application web moderne de chat avec IA construite avec React, TypeScript et Tailwind CSS.

## Fonctionnalités

- 💬 Interface de chat intuitive
- 🤖 Intégration avec OpenRouter API pour les réponses IA
- 🌙 Mode sombre/clair avec thème adaptatif
- 📱 Design responsive
- 💾 Export des conversations en PDF
- ⚡ Simulation de réponses IA si la clé API n'est pas configurée

## Technologies utilisées

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS, Radix UI
- **Routing**: React Router
- **State Management**: React Query, Zustand
- **Thèmes**: next-themes
- **API**: OpenRouter (optionnel)

## Installation

1. **Cloner le repository**
   ```bash
   git clone <URL_DU_REPO>
   cd <NOM_DU_PROJET>
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'API (optionnel)**
   - Créer un fichier `.env` à la racine
   - Ajouter votre clé OpenRouter :
     ```
     OPENROUTER_API_KEY=votre_clé_api_ici
     ```
   - Sans clé API, l'application utilisera des réponses simulées

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:8080
   ```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run build:dev` - Construit en mode développement
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## Structure du projet

```
src/
├── components/
│   ├── ui/          # Composants UI réutilisables
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   └── TypingIndicator.tsx
├── hooks/
│   ├── useChat.ts   # Hook principal pour la logique du chat
│   └── use-toast.ts
├── lib/
│   ├── pdfExport.ts # Export PDF
│   └── utils.ts
├── pages/
│   ├── Index.tsx    # Page principale
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Déploiement

L'application peut être déployée sur n'importe quelle plateforme supportant les applications React :

- Vercel
- Netlify
- GitHub Pages
- Serveur statique

## Configuration

### Variables d'environnement

- `VITE_OPENROUTER_API_KEY` : Clé API OpenRouter (obligatoire pour les réponses IA en temps réel)
- `VITE_API_URL` : Clé API OpenRouter

### Thèmes

L'application supporte le mode sombre et clair. Le thème est sauvegardé automatiquement dans le localStorage.

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonction`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonction`)
5. Ouvrir une Pull Request

## Licence

MIT
