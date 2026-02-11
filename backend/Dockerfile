# Use Node.js LTS version
FROM node:18-alpine

RUN apk add --no-cache openssl

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
# Only install production dependencies if NODE_ENV is set, 
# but we need prisma to generate the client.
RUN npm install

# Bundle app source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
