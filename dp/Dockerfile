# Use the official Node.js image for building Angular
FROM node:22.15.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Angular dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Build the Angular app
RUN npm run build --prod
# Expose the port the app runs on
EXPOSE 4200
# Start the Angular app
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--configuration=development"]
