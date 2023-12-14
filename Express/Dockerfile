# Use an official Node.js runtime as a base image
FROM node:16

# Set environment variables for the application
ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY Express/package*.json ./

# Install app dependencies
RUN npm install
RUN npx prisma generate

# Bundle app source
COPY Express/ ./

# Expose the port on which the app will run
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]
