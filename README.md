# Startup Marketplace

A digital-first multi-vendor marketplace offering curated startup tools, templates, and services.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites
- Docker and Docker Compose installed.

### Setup
1. Clone the repository.
2. Run `docker-compose up`.
3. The frontend will be available at `http://localhost:3000`.
4. The backend will be available at `http://localhost:5000`.

## Deployment

### GitHub Secrets
Set the following secrets in your GitHub repository settings:
- `VPS_IP`: Your VPS IP address.
- `VPS_USER`: Your SSH username.
- `SSH_PRIVATE_KEY`: Your SSH private key.
- `DB_USER`: Postgres user.
- `DB_PASSWORD`: Postgres password.
- `DB_NAME`: Postgres database name.

### CI/CD Pipeline
- Every push to the `main` branch triggers a build and deploy to your VPS.
- Docker images are pushed to GitHub Container Registry (GHCR).
- The VPS pulls the latest images and restarts services using `docker-compose.prod.yml`.
