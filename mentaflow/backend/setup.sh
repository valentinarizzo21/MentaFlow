#!/bin/bash
set -e

echo "=== MentaFlow Backend Setup ==="

# 1. Crea solution
dotnet new sln -n MentaFlow -o .

# 2. Aggiungi progetti alla solution
dotnet sln add src/MentaFlow.Domain/MentaFlow.Domain.csproj
dotnet sln add src/MentaFlow.Application/MentaFlow.Application.csproj
dotnet sln add src/MentaFlow.Infrastructure/MentaFlow.Infrastructure.csproj
dotnet sln add src/MentaFlow.API/MentaFlow.API.csproj

echo "✓ Solution configurata"

# 3. Avvia Docker (SQL Server)
echo "Avvio SQL Server su Docker..."
docker compose up -d
echo "Attendo che SQL Server sia pronto..."
sleep 20

# 4. Crea migration iniziale
cd src/MentaFlow.API
dotnet ef migrations add InitialCreate \
  --project ../MentaFlow.Infrastructure/MentaFlow.Infrastructure.csproj \
  --startup-project . \
  --output-dir Data/Migrations

echo "✓ Migration creata"

# 5. Applica migration (il codice la applica automaticamente all'avvio,
#    ma puoi farlo anche manualmente così:)
# dotnet ef database update --project ../MentaFlow.Infrastructure --startup-project .

echo ""
echo "=== Setup completato! ==="
echo "Avvia il backend con: dotnet run --project src/MentaFlow.API"
echo "Swagger disponibile su: http://localhost:5000/swagger"
