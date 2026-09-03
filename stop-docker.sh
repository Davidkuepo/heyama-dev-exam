#!/bin/bash

echo "🛑 Arrêt de Heyama Docker..."
echo ""

docker-compose down

echo "✅ Services arrêtés!"
echo ""
echo "💾 Les données MongoDB sont conservées dans les volumes Docker."
echo "🚀 Relance avec: ./start-docker.sh"
