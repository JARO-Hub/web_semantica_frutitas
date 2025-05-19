# Use the official Node.js image for building Angular
FROM node:22.15.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Angular dependencies
RUN npm install

# Copy the application code into the container
RUN npm ci

COPY . .

# Build the Angular app
RUN npx ng build --configuration production
# Expose the port the app runs on
# ---------- 2) Fase runtime ----------
FROM nginx:1.27-alpine

# Copiamos el build al doc-root de nginx
COPY --from=builder /app/dist/frutas/ /usr/share/nginx/html

# Small tweaks: compresión y SPA fallback
RUN <<'BASH'
  set -e
  # gzip está habilitado por defecto; añadimos fallback para rutas internas
  printf '\nlocation / { try_files $uri $uri/ /index.html; }\n' \
        > /etc/nginx/conf.d/spa.conf
BASH

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
