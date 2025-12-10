# Use official Node image (small Alpine version)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client source code
COPY . .

# Build production version of React app
RUN npm run build

# Install "serve" to host the build folder
RUN npm install -g serve

# Expose port 3000 inside container
EXPOSE 3000

# Run the production build with "serve"
CMD ["serve", "-s", "build", "-l", "3000"]
