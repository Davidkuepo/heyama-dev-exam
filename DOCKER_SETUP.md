# 🐳 Docker Setup - MongoDB + Mongo Express

## ✨ Pourquoi Docker?

- ✅ **Pas d'installation système** - MongoDB tourne dans un container
- ✅ **Isolation** - N'affecte pas le reste de ta machine
- ✅ **Volumes persistants** - Les données restent après redémarrage
- ✅ **Mongo Express inclus** - Interface web pour gérer MongoDB
- ✅ **Facile à démarrer/arrêter** - Un seul script!

---

## 🚀 Quick Start

### 1️⃣ **Installe Docker** (une seule fois)

**Linux (Ubuntu/Debian):**
```bash
! curl -fsSL https://get.docker.com -o get-docker.sh
! sudo sh get-docker.sh
! sudo usermod -aG docker $USER
! newgrp docker
```

**macOS/Windows:**
- Télécharge [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Lance-le et attends 2-3 minutes

### 2️⃣ **Démarre MongoDB avec Docker**

```bash
cd /home/david/Documents/heyama-dev-exam
./start-docker.sh
```

**Affiche:**
```
✅ MongoDB est prêt!

📊 Accès à Mongo Express:
   http://localhost:8081

📚 Informations de connexion:
   URI: mongodb://localhost:27017/heyama-dev
   Host: localhost
   Port: 27017
```

### 3️⃣ **Accès à Mongo Express**

Ouvre dans le navigateur:
```
http://localhost:8081
```

**Tu peux:**
- ✅ Voir les collections
- ✅ Ajouter/modifier des données
- ✅ Supprimer des documents
- ✅ Exporter en JSON

---

## 🔧 Commandes Docker

### Démarrer MongoDB
```bash
./start-docker.sh
```

### Arrêter MongoDB
```bash
./stop-docker.sh
```

### Voir les logs
```bash
docker-compose logs -f mongodb
```

### Redémarrer
```bash
docker-compose restart mongodb
```

### Voir l'état des containers
```bash
docker-compose ps
```

### Accéder au shell MongoDB
```bash
docker exec -it heyama-mongodb mongosh
```

Puis:
```javascript
use heyama-dev
db.users.find()
db.heyamaobjects.find()
db.users.countDocuments()
```

### Supprimer tout (attention!)
```bash
docker-compose down -v  # -v = supprime aussi les données
```

---

## 📊 Architectures

### Ce qui tourne avec Docker:
```
🐳 Container 1: MongoDB (port 27017)
   └─ Data volume pour persistence

🐳 Container 2: Mongo Express (port 8081)
   └─ Interface web pour gérer MongoDB
```

### Communication:
```
Frontend (3001) ──> Backend (3000) ──> MongoDB Docker (27017)
```

---

## 🚀 Workflow Complet

```bash
# Terminal 1: Démarrer Docker
cd /home/david/Documents/heyama-dev-exam
./start-docker.sh

# Terminal 2: Backend
cd backend
npm install  # (une seule fois)
npm run start:dev

# Terminal 3: Frontend
cd frontend
npm install  # (une seule fois)
npm run dev

# Terminal 4: Voir les données
# Ouvre http://localhost:8081 dans le navigateur
```

---

## 🔒 Configuration

Fichier: `docker-compose.yml`

```yaml
mongodb:
  image: mongo:7.0  # Version MongoDB
  ports:
    - "27017:27017"  # Port exposé
  volumes:
    - mongodb_data:/data/db  # Persistence des données

mongo-express:
  ports:
    - "8081:8081"  # Interface web
```

Pour modifier:
1. Édite `docker-compose.yml`
2. Relance: `docker-compose down && ./start-docker.sh`

---

## 💾 Données Persistantes

Les données MongoDB sont sauvegardées dans un **Docker Volume**:
```bash
# Voir les volumes
docker volume ls

# Localisation:
# Linux: /var/lib/docker/volumes/heyama_mongodb_data/_data
# macOS/Windows: Docker Desktop gère automatiquement
```

Les données restent même si tu arrêtes les containers:
```bash
./stop-docker.sh  # Les données restent
./start-docker.sh # Les données réapparaissent
```

---

## 🐛 Troubleshooting

**Port 27017 déjà utilisé:**
```bash
# Tue le processus occupant le port
sudo lsof -i :27017 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Ou change le port dans docker-compose.yml:
ports:
  - "27018:27017"  # Accès via 27018
```

**Mongo Express refuse de se connecter:**
```bash
docker-compose logs mongo-express
# Vérifier les erreurs de connexion
```

**MongoDB n'est pas prêt:**
```bash
# Les logs disent "waiting for MongoDB to be ready"
# Attends 10-15 secondes, c'est normal

# Ou force un redémarrage:
docker-compose restart mongodb
```

**Erreur "docker: command not found":**
```bash
# Docker n'est pas installé
# Ou pas dans le PATH
# Redémarre le terminal après installation
```

---

## 📚 Docker Compose vs Docker CLI

Si tu veux utiliser Docker CLI directement:

```bash
# Démarrer MongoDB seul
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Arrêter
docker stop mongodb

# Recommencer
docker start mongodb
```

**Mais docker-compose est mieux** (configuration en fichier, facile à reproduire)

---

## ✅ Vérification

Après `./start-docker.sh`:

```bash
# Vérifie MongoDB répond
! mongosh "mongodb://localhost:27017/heyama-dev"

# Ou avec le script Node.js
cd backend
node mongodb-cli.js
```

Devrait afficher: `✅ Connected successfully!`

---

## 🎉 Prêt!

Tout est configuré! Les 3 services tournent:
- ✅ MongoDB (27017)
- ✅ Mongo Express (8081)
- ✅ Backend + Frontend

Aucune installation système requise! 🐳✨
