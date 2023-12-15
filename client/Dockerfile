# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install app dependencies
RUN npm install

# Copy the local source code to the container
COPY . .

# Expose the port on which the app will run (if applicable)
EXPOSE 3000

# Start the React app
CMD ["npm", "dockerStart"]
