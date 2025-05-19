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
cat >/etc/nginx/conf.d/default.conf <<'CONF'
server {
    listen 80;
    server_name _;

    root   /usr/share/nginx/html;
    index  index.html;

    # --- Fallback SPA ---
    location / {
        try_files $uri $uri/ /index.html;
    }

    # --- Gzip mínimo (ya viene activado, sólo ejemplo) ---
    gzip            on;
    gzip_types      text/plain text/css application/json application/javascript application/octet-stream application/xml+rss;

    # --- Cache estáticos un año ---
    location ~* \.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf)$ {
        expires 365d;
        add_header Cache-Control "public";
    }
}
CONF
BASH


EXPOSE 80
CMD ["nginx","-g","daemon off;"]
