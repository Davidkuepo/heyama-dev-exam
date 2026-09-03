# 🚀 Guide de Déploiement Manuel - Heyama Dev Exam

## 📋 Prérequis

- Docker & Docker Compose installés
- Git
- Un serveur VPS ou machine pour l'hébergement

## 🔧 Étapes de Déploiement

### 1. **Cloner et préparer le projet**

```bash
git clone https://github.com/YOUR_USERNAME/heyama-dev-exam.git
cd heyama-dev-exam
```

### 2. **Créer le fichier `.env.prod`**

```bash
cp backend/.env.example backend/.env.prod
cat > backend/.env.prod << 'EOL'
MONGODB_URI=mongodb://mongo:27017/heyama
JWT_SECRET=your_super_secure_random_key_here_change_this
NODE_ENV=production
PORT=3000
EOL
```

### 3. **Configurer le frontend**

```bash
cat > frontend/.env.production << 'EOL'
NEXT_PUBLIC_API_URL=http://your-server-ip:3000
# ou si vous avez un domaine
# NEXT_PUBLIC_API_URL=https://api.votredomaine.com
EOL
```

### 4. **Lancer en production**

```bash
# Construire et démarrer tous les services
docker compose -f docker-compose.prod.yml up -d

# Vérifier les logs
docker compose -f docker-compose.prod.yml logs -f

# Vérifier les services
docker compose -f docker-compose.prod.yml ps
```

### 5. **Accéder à l'app**

- Frontend: `http://your-server-ip:3001`
- Backend API: `http://your-server-ip:3000`
- MongoDB: `mongodb://localhost:27017`

---

## 🛑 Commandes Utiles

```bash
# Arrêter l'app
docker compose -f docker-compose.prod.yml down

# Redémarrer
docker compose -f docker-compose.prod.yml restart

# Voir les logs
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f frontend

# Purger les données
docker compose -f docker-compose.prod.yml down -v

# Rebuild les images
docker compose -f docker-compose.prod.yml build --no-cache
```

---

## 🌐 Avec un Reverse Proxy (Nginx)

Pour utiliser un domaine custom, configurez Nginx:

```nginx
server {
    listen 80;
    server_name api.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name www.votredomaine.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Puis mettre à jour `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://api.votredomaine.com
```

---

## ✅ Checklist Pre-Deployment

- [ ] JWT_SECRET est unique et sécurisé
- [ ] MONGODB_URI pointe vers le bon serveur
- [ ] NEXT_PUBLIC_API_URL est correct
- [ ] Ports 3000 et 3001 sont ouverts
- [ ] MongoDB est accessible
- [ ] Node version >= 20

---

## 🐛 Troubleshooting

### Backend ne démarre pas
```bash
docker compose -f docker-compose.prod.yml logs backend
# Vérifiez les variables d'env et MONGODB_URI
```

### Frontend ne se connecte pas au backend
```
Vérifiez NEXT_PUBLIC_API_URL dans frontend/.env.production
Assurez-vous que le backend est accessible depuis le frontend
```

### MongoDB refuse les connexions
```bash
# Vérifiez que MongoDB est bien lancé
docker compose -f docker-compose.prod.yml logs mongo

# Redémarrez MongoDB
docker compose -f docker-compose.prod.yml restart mongo
```

---

## 🔐 Sécurité

- ✅ Changez `JWT_SECRET` avec une clé sécurisée
- ✅ Utilisez HTTPS en production (Nginx + Let's Encrypt)
- ✅ Ne commitez JAMAIS `.env.prod`
- ✅ Sauvegardez régulièrement MongoDB

