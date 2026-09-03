# MongoDB CLI Guide

## 🗄️ Utiliser MongoDB avec Heyama

### Option 1: MongoDB CLI Script (Recommandé)

C'est un script Node.js qui se connecte à MongoDB et affiche les données:

```bash
cd backend
node mongodb-cli.js
```

**Affiche:**
- État de connexion à MongoDB
- Toutes les collections
- Nombre de documents par collection
- Liste des utilisateurs (email, name, ID)
- Premiers objets créés

### Option 2: Mongo Shell (si installé)

Si tu as `mongosh` installé:

```bash
mongosh "mongodb://localhost:27017/heyama-dev"
```

Puis dans le shell:
```javascript
// Voir les users
db.users.find()

// Voir les objects
db.heyamaobjects.find()

// Compter les documents
db.users.countDocuments()

// Supprimer tous les users (attention!)
db.users.deleteMany({})
```

### Option 3: MongoDB Compass (Interface GUI)

1. Télécharge MongoDB Compass: https://www.mongodb.com/products/tools/compass
2. Lance-le et connecte à `mongodb://localhost:27017/heyama-dev`
3. Tu peux explorer les collections visuellement

---

## 🔧 Configuration

Le script utilise cette variable:
```
MONGODB_URI=mongodb://localhost:27017/heyama-dev
```

Modifie dans `backend/.env` si ta base est ailleurs.

---

## ✅ Vérification

### Vérifie que MongoDB tourne:
```bash
! lsof -i :27017
```

Devrait afficher un process `mongod`

### Test de connexion:
```bash
cd backend
node mongodb-cli.js
```

Devrait afficher `✅ Connected successfully!`

---

## 📊 Collections

### `users` - Utilisateurs enregistrés
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "name": "User Name",
  "password": "bcrypt_hash",
  "createdAt": Date,
  "updatedAt": Date
}
```

### `heyamaobjects` - Objets créés
```json
{
  "_id": ObjectId,
  "title": "Object Title",
  "description": "Object description",
  "imageUrl": "https://s3.aws...",
  "createdAt": Date,
  "updatedAt": Date
}
```

---

## 🚀 Workflow Complet

```bash
# 1. Lance MongoDB
mongod

# 2. Vérifie la connexion
cd backend && node mongodb-cli.js

# 3. Lance le backend
npm run start:dev

# 4. Lance le frontend (nouveau terminal)
cd frontend && npm run dev

# 5. Enregistre un user
# Va sur http://localhost:3001/auth/register

# 6. Vérifier l'utilisateur en DB
cd backend && node mongodb-cli.js
# Devrait afficher ton email!

# 7. Crée des objets
# Va sur la galerie et crée des objets

# 8. Vérifier les objets en DB
cd backend && node mongodb-cli.js
# Devrait afficher tes objets!
```

---

## 🐛 Troubleshooting

**"Connection refused"**
```bash
! mongod
```

**"EADDRINUSE :27017"** (Port déjà utilisé)
```bash
# Tue le processus
! lsof -i :27017 | grep mongod | awk '{print $2}' | xargs kill
```

**"ENOAUTH Authentication failed"**
- Assure-toi que MongoDB n'a pas d'authentification
- Ou ajoute le user/password dans MONGODB_URI

---

## 💡 Tips

**Importer des données:**
```bash
mongoimport --db heyama-dev --collection users --file users.json
```

**Exporter les données:**
```bash
mongoexport --db heyama-dev --collection users --out users.json
```

**Reset la base de données:**
```bash
mongo "mongodb://localhost:27017/heyama-dev" --eval "db.dropDatabase()"
```

---

**Tout est configuré et prêt! 🚀**
