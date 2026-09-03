#!/bin/bash

# 🚀 Script de déploiement Heyama

set -e

echo "🚀 Déploiement Heyama en production..."

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Vérifier Docker
echo -e "${BLUE}✓ Vérification de Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker n'est pas installé${NC}"
    exit 1
fi

# 2. Vérifier .env.prod
echo -e "${BLUE}✓ Vérification des fichiers .env...${NC}"
if [ ! -f backend/.env.prod ]; then
    echo -e "${RED}✗ backend/.env.prod n'existe pas${NC}"
    echo "Créez le fichier avec: cp backend/.env.example backend/.env.prod"
    exit 1
fi

if [ ! -f frontend/.env.production ]; then
    echo -e "${RED}✗ frontend/.env.production n'existe pas${NC}"
    echo "Créez le fichier avec: cat > frontend/.env.production << 'EOL'"
    echo "NEXT_PUBLIC_API_URL=http://your-server-ip:3000"
    echo "EOL"
    exit 1
fi

# 3. Pull les derniers changements
echo -e "${BLUE}✓ Mise à jour du code...${NC}"
git pull origin main || true

# 4. Build et démarrage
echo -e "${BLUE}✓ Construction des images Docker...${NC}"
docker compose -f docker-compose.prod.yml build

echo -e "${BLUE}✓ Démarrage des services...${NC}"
docker compose -f docker-compose.prod.yml up -d

# 5. Attendre le démarrage
echo -e "${BLUE}✓ Attente du démarrage des services...${NC}"
sleep 5

# 6. Vérifier l'état
echo -e "${BLUE}✓ État des services:${NC}"
docker compose -f docker-compose.prod.yml ps

# 7. Afficher les URLs
echo ""
echo -e "${GREEN}✅ Déploiement réussi!${NC}"
echo ""
echo "🌐 URLs d'accès:"
echo "  Frontend:  http://localhost:3001"
echo "  Backend:   http://localhost:3000"
echo "  MongoDB:   mongodb://localhost:27017"
echo ""
echo "📋 Commandes utiles:"
echo "  Logs:      docker compose -f docker-compose.prod.yml logs -f"
echo "  Arrêter:   docker compose -f docker-compose.prod.yml down"
echo "  Redémarrer: docker compose -f docker-compose.prod.yml restart"
echo ""

