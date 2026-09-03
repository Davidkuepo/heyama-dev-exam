# 🚀 Déploiement Railway - Heyama Dev Exam

**La manière la plus facile pour déployer en production!**

## 📋 Prérequis

- Compte GitHub avec le repo `heyama-dev-exam`
- Compte Railway (gratuit sur railway.app)

## 🚀 Déploiement en 5 Minutes

### 1. Crée un compte Railway

Va sur https://railway.app et crée un compte gratuit

### 2. Crée un nouveau projet

- Clique **"New Project"**
- Sélectionne **"Deploy from GitHub"**
- Autorise Railway d'accéder à ton GitHub
- Sélectionne le repo `heyama-dev-exam`

### 3. Railway détecte automatiquement

Railway scanne le repo et crée 2 services:
- ✅ **Backend** (détecte `backend/Dockerfile`)
- ✅ **Frontend** (détecte `frontend/Dockerfile`)

### 4. Configure les variables d'environnement

#### Backend Service
Clique sur le service Backend et va à **Variables**

```
MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/heyama
JWT_SECRET = your_super_secret_random_key_here
NODE_ENV = production
PORT = 3000
```

#### Frontend Service
Clique sur le service Frontend et va à **Variables**

```
NEXT_PUBLIC_API_URL = https://ton-backend-railway.up.railway.app
```

### 5. Ajoute MongoDB

- Clique **"New"** dans Railway
- Sélectionne **"Add Service"**
- Sélectionne **"Database"** → **"MongoDB"**
- Railway crée automatiquement `MONGODB_URI`
- Attache à ton Backend service

### 6. Deploy!

Railway build & deploy automatiquement! 🎉

```
Status: ✅ Deploy complete
Backend: https://ton-backend-railway.up.railway.app
Frontend: https://ton-frontend-railway.up.railway.app
```

---

## 🔗 URLs d'Accès

Une fois déployé:

- **Frontend**: `https://heyama-frontend-Xxxxxx.up.railway.app`
- **Backend API**: `https://heyama-backend-Xxxxxx.up.railway.app`
- **MongoDB**: Géré automatiquement par Railway

---

## 📊 Dashboard Railway

Dans le dashboard Railway tu peux:
- ✅ Voir les logs en temps réel
- ✅ Redéployer en un clic
- ✅ Gérer les variables d'env
- ✅ Voir la consommation (CPU, RAM, DB)
- ✅ Configurer les domaines custom

---

## 🔄 Mise à Jour du Code

Quand tu push du code sur GitHub:

```bash
git push origin master
```

Railway redéploie **automatiquement** en ~2 minutes! 🚀

---

## 💰 Tarification

Railway offre:
- **500 credits/mois** (gratuit)
- Mongo DB inclus
- Déploiement illimité
- Perfect pour dev & staging

---

## 🐛 Troubleshooting

### Backend ne démarre pas
```
Logs → Vérifier MONGODB_URI et JWT_SECRET
Rails relance automatiquement
```

### Frontend ne se connecte pas au backend
```
Vérifier NEXT_PUBLIC_API_URL dans les variables
S'assurer que le backend est accessible
```

### MongoDB refuse les connexions
```
Vérifier MONGODB_URI est correct
S'assurer que le service MongoDB est attaché
```

---

## ✨ Avantages Railway

- ✅ **Zéro config** - Détecte tout automatiquement
- ✅ **Auto redeploy** - Push code → Auto deploy
- ✅ **Logs temps réel** - Debug facilement
- ✅ **Domaines gratuits** - railway.app domain inclus
- ✅ **MongoDB inclus** - Base de données gratuite
- ✅ **Support gratuit** - Discord community active

---

## 🎯 Prochaines Étapes (Optional)

### Ajouter un domaine custom

1. Railway Dashboard → Settings → Domains
2. Ajoute ton domaine (votredomaine.com)
3. Configure DNS records selon les instructions Railway
4. HTTPS automatique avec Let's Encrypt ✅

### Monitoring & Alertes

Railway offre alerting gratuit pour:
- CPU élevé
- RAM élevée
- Deploy échoué
- Service down

---

**C'est tout! Ton app est en production!** 🚀

