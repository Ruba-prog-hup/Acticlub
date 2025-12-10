# Use official Node image (small Alpine version)
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache "npm install" if packages do not change
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server source code
COPY . .

# Expose port 5000 inside the container
EXPOSE 5000

# Start the server
# In Docker we use "npm start" (which runs: node index.js)
CMD ["npm", "start"]
