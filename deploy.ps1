# Deployment script for Startup Marketplace
# Run this from the project root

$SERVER = "72.61.250.54"
$USER = "root"
$KEY = "deploy_key"
$REMOTE_DIR = "~/startup-marketplace"

Write-Host "--- 1. Creating Remote Directory ---" -ForegroundColor Cyan
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" "mkdir -p $REMOTE_DIR"

Write-Host "--- 2. Transferring Configuration Files ---" -ForegroundColor Cyan
scp -i $KEY -o StrictHostKeyChecking=no docker-compose.prod.yml nginx.conf "$USER@$SERVER`:$REMOTE_DIR/"

Write-Host "--- 3. Transferring Source Code (This may take a moment) ---" -ForegroundColor Cyan
# Using -r for recursive. We exclude node_modules via .gitignore logic if possible, 
# but scp is simple. We assume clean local state.
scp -r -i $KEY -o StrictHostKeyChecking=no backend frontend "$USER@$SERVER`:$REMOTE_DIR/"

Write-Host "--- 4. Building and Starting Containers on VPS ---" -ForegroundColor Cyan
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" "cd $REMOTE_DIR && docker compose down && docker compose up --build -d"

Write-Host "--- 5. Configuring Nginx ---" -ForegroundColor Cyan
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" "cp $REMOTE_DIR/nginx.conf /etc/nginx/sites-available/startupideaexchange && ln -sf /etc/nginx/sites-available/startupideaexchange /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"

Write-Host "--- Deployment Complete! ---" -ForegroundColor Green
Write-Host "Visit http://startupideaexcahnge.in" -ForegroundColor Yellow
