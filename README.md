# 🎨 Heyama Dev Exam - Fullstack Application

**Senior-level fullstack implementation** avec NestJS, Next.js, MongoDB et WebSocket en temps réel.

## ✨ Caractéristiques

- ✅ **Authentication JWT** avec login/register
- ✅ **Real-time WebSocket** avec Socket.io
- ✅ **i18n Français/English** complet
- ✅ **Beautiful Minimalist UI** avec Tailwind + shadcn/ui
- ✅ **Responsive Design** mobile-first
- ✅ **Image Upload** base64
- ✅ **Toast Notifications** avec Sonner
- ✅ **Delete Confirmations** modales
- ✅ **Search & Filter** fonctionnel
- ✅ **Production Ready** avec Docker

## 🏗️ Stack Technique

### Backend
- **NestJS** v10 - Framework Node.js
- **MongoDB** - Base de données
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.io** - Real-time

### Frontend
- **Next.js** v14 - React framework
- **React 18** - UI
- **Tailwind CSS** - Styling
- **shadcn/ui** - Components
- **React Hook Form** - Forms
- **Zod** - Validation
- **Axios** - HTTP client
- **Sonner** - Notifications

## 🚀 Déploiement

### Déploiement Manuel (Docker)

```bash
# 1. Préparer les variables d'environnement
cp backend/.env.example backend/.env.prod
# Éditer backend/.env.prod avec vos valeurs

cat > frontend/.env.production << 'EOL'
NEXT_PUBLIC_API_URL=http://your-server-ip:3000
EOL

# 2. Lancer le déploiement
./deploy.sh

# Ou manuellement:
docker compose -f docker-compose.prod.yml up -d
```

### Accès

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017

📖 Voir `DEPLOYMENT.md` pour plus de détails

## 📦 Développement Local

### Backend
```bash
cd backend
npm install
npm run start:dev
```

Backend démarre sur `http://localhost:3000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend démarre sur `http://localhost:3001`

### MongoDB
```bash
docker compose up -d
```

MongoDB démarre sur `mongodb://localhost:27017`

## 🔑 Variables d'Environnement

### Backend (`.env.prod`)
```
MONGODB_URI=mongodb://mongo:27017/heyama
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=3000
```

### Frontend (`.env.production`)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev           # Frontend dev
npm run start:dev     # Backend dev

# Production
npm run build         # Build
npm run start         # Start prod

# Docker
docker compose -f docker-compose.prod.yml up -d      # Démarrer
docker compose -f docker-compose.prod.yml down       # Arrêter
docker compose -f docker-compose.prod.yml logs -f    # Logs
```

## 📋 Structure du Projet

```
heyama-dev-exam/
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── auth/
│   │   ├── objects/
│   │   └── websocket/
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── auth/
│   │   ├── objects/
│   │   ├── profile/
│   │   └── settings/
│   ├── components/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── deploy.sh
└── DEPLOYMENT.md
```

## 🔐 Sécurité

- ✅ JWT authentication
- ✅ Password hashing avec bcrypt
- ✅ CORS configuré
- ✅ Environment variables sépaées
- ✅ MongoDB connection sécurisée
- ⚠️ **En production**: Utilisez HTTPS avec Nginx/Certbot

## 📞 Support

Voir `DEPLOYMENT.md` pour troubleshooting

---

**Développé avec ❤️ pour le Heyama Dev Exam**
