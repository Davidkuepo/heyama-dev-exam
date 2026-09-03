# 🚀 Déploiement Render - Heyama Dev Exam

**Render est plus stable que Railway et gratuit!**

## 📋 3 Étapes Seulement

### 1️⃣ **Va sur render.com**
https://render.com

### 2️⃣ **Crée un compte gratuit**
(ou login si tu as déjà)
- Clique **"GitHub"** pour authoriser

### 3️⃣ **Crée un nouveau service**
- Clique **"New +"**
- Sélectionne **"Web Service"**
- Sélectionne ton repo GitHub: `heyama-dev-exam`
- Clique **"Connect"**

---

## 🎯 Render détecte automatiquement

Render scan `render.yaml` et crée:
- ✅ **Backend Service** (Node.js)
- ✅ **Frontend Service** (Node.js) 
- ✅ **MongoDB Database** (gratuit!)

Les variables d'env se configurent automatiquement ✅

---

## ✨ Avantages Render vs Railway

| Feature | Render | Railway |
|---------|--------|---------|
| Gratuit | ✅ Oui | ✅ Oui |
| Auto redeploy | ✅ Oui | ✅ Oui |
| MongoDB gratuit | ✅ Oui | ✅ Oui |
| Stabilité | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Support | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Config | Automatique | Manuel |

---

## 🔗 URLs de Production

Une fois déployé:
- **Frontend**: `https://heyama-frontend.onrender.com`
- **Backend**: `https://heyama-backend.onrender.com`
- **MongoDB**: Géré automatiquement

---

## 📊 Dashboard Render

Tu peux:
- ✅ Voir les logs en temps réel
- ✅ Redéployer en un clic
- ✅ Gérer les variables d'env
- ✅ Monitorer CPU/RAM
- ✅ Ajouter des domaines custom

---

## 🔄 Auto Redeploy

Quand tu fais:
```bash
git push origin master
```

Render redéploie **automatiquement** en ~3-5 minutes! 🚀

---

## 🐛 Troubleshooting

### Service ne démarre pas?
1. Clique sur le service
2. Va à **Logs**
3. Vérifier l'erreur

### MongoDB ne répond pas?
1. Attendre 1-2 min pour que MongoDB démarre
2. Render crée automatiquement la connexion

### Frontend ne voit pas le backend?
1. Vérifier `NEXT_PUBLIC_API_URL` dans les variables
2. S'assurer que le backend est accessible

---

## 💡 Tips

- **Gratuit illimité** pour dev/test
- **Dormant après 15 min** d'inactivité (normal)
- **Auto wake up** quand quelqu'un visite
- **Logs visibles** dans le dashboard

---

**C'est tout! Render gère le reste!** ✨

