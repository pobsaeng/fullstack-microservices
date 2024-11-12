# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code
COPY . .

# Expose the app's port
EXPOSE 8087

# CMD [ "node", "index.js" ]
CMD ["npm", "start"]
