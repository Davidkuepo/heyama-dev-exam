#!/bin/bash

echo "🚀 Démarrage de Heyama avec Docker..."
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé!"
    echo "Installe Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Vérifier si docker-compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose n'est pas installé!"
    echo "Installe Docker Desktop (inclut docker-compose)"
    exit 1
fi

echo "✅ Docker trouvé!"
echo ""

# Démarrer les services
echo "🐳 Démarrage de MongoDB et Mongo Express..."
docker-compose up -d

echo ""
echo "⏳ Attente du démarrage de MongoDB..."
sleep 5

# Vérifier que MongoDB est prêt
if docker-compose ps | grep -q "healthy"; then
    echo "✅ MongoDB est prêt!"
    echo ""
    echo "📊 Accès à Mongo Express:"
    echo "   http://localhost:8081"
    echo ""
    echo "📚 Informations de connexion:"
    echo "   URI: mongodb://localhost:27017/heyama-dev"
    echo "   Host: localhost"
    echo "   Port: 27017"
    echo "   Database: heyama-dev"
    echo ""
    echo "🔧 Commandes utiles:"
    echo "   Arrêter:   docker-compose down"
    echo "   Logs:      docker-compose logs -f mongodb"
    echo "   Redémarrer: docker-compose restart mongodb"
    echo ""
else
    echo "⚠️  MongoDB en cours de démarrage... attends 10 secondes"
    sleep 10
fi

echo "✨ Prêt! Tu peux maintenant lancer ton backend et frontend."
