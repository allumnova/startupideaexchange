# Optimized Deployment script for Startup Marketplace
# Run this from the project root

$SERVER = "72.61.250.54"
$USER = "root"
$KEY = "deploy_key"
$REMOTE_DIR = "~/startup-marketplace"

Write-Host "--- 1. Creating Remote Directory ---" -ForegroundColor Cyan
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" "mkdir -p $REMOTE_DIR"

Write-Host "--- 2. Packaging Source Code (Excluding node_modules) ---" -ForegroundColor Cyan
# Create a tarball excluding heavy directories
# We include docker-compose.prod.yml renamed to docker-compose.yml for simplicity on server
Copy-Item docker-compose.prod.yml docker-compose.yml
tar --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='dist' -czf deployment.tar.gz backend frontend docker-compose.yml nginx.conf

Write-Host "--- 3. Transferring Package ---" -ForegroundColor Cyan
scp -i $KEY -o StrictHostKeyChecking=no deployment.tar.gz "$USER@$SERVER`:$REMOTE_DIR/"

Write-Host "--- 4. Extracting and Deploying on VPS ---" -ForegroundColor Cyan
$COMMANDS = "
cd $REMOTE_DIR
tar -xzf deployment.tar.gz
docker compose down
docker compose up --build -d
"
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" $COMMANDS

Write-Host "--- 5. Configuring Nginx ---" -ForegroundColor Cyan
$NGINX_CMDS = "
cp $REMOTE_DIR/nginx.conf /etc/nginx/sites-available/startupideaexchange
ln -sf /etc/nginx/sites-available/startupideaexchange /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
"
ssh -i $KEY -o StrictHostKeyChecking=no "$USER@$SERVER" $NGINX_CMDS

Write-Host "--- 6. Cleanup ---" -ForegroundColor Cyan
Remove-Item deployment.tar.gz
Remove-Item docker-compose.yml

Write-Host "--- Deployment Complete! ---" -ForegroundColor Green
Write-Host "Visit http://startupideaexcahnge.in" -ForegroundColor Yellow
