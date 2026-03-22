#!/bin/bash
# Claude Code Session Hook - Auto-generated
# Monitors Docker containers and suggests setup if needed

set -e

PROJECT_NAME=$(basename "$(pwd)")
echo "🚀 Claude Code initialized for: $PROJECT_NAME"
echo ""

###############################################################################
# Docker Detection and Health Monitoring
###############################################################################

# Check if Docker files exist
if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ] || [ -f "Dockerfile" ]; then
  echo "🐳 Docker project detected"

  # Check if Docker is available
  if command -v docker &> /dev/null; then
    # Check for running containers in this project
    if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ]; then
      RUNNING=$(docker compose ps -q 2>/dev/null | wc -l)
      
      if [ "$RUNNING" -gt 0 ]; then
        echo "  ✅ $RUNNING container(s) running"
        echo ""
        docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || true
        
        # Check for unhealthy containers
        UNHEALTHY=$(docker compose ps --format "{{.Health}}" 2>/dev/null | grep -c "unhealthy" || echo "0")
        if [ "$UNHEALTHY" -gt 0 ]; then
          echo ""
          echo "  ⚠️  $UNHEALTHY container(s) unhealthy"
          echo "  💡 Try: docker compose restart"
        fi
      else
        echo "  ℹ️  No containers running"
        echo "  💡 Start with: docker compose up -d"
      fi
    else
      echo "  ℹ️  Dockerfile found (no compose file)"
      echo "  💡 Build with: docker build -t $PROJECT_NAME ."
    fi
  else
    echo "  ⚠️  Docker not available"
  fi
else
  echo "📦 No Docker configuration found"
  echo "  💡 Run /docker-init to set up Docker for this project"
fi

echo ""
echo "✅ Session ready"
