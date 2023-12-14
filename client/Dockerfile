# Use an official Node.js runtime as a base image
FROM node:16 AS react-builder

# Set the working directory in the container
WORKDIR /usr/src/client

# Add this line to list the contents of the working directory
RUN ls -l

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# List the contents again to check the copied files
RUN ls -l

# Install app dependencies
RUN npm install

# Copy the client source code
COPY client/ ./

# List the contents again to check the copied source code
RUN ls -l

# Build the React app
RUN npm run build

# Use a smaller image for the production build
FROM node:16-alpine

# Copy the build from the react-builder stage
COPY --from=react-builder /usr/src/client/build .

# Expose the port on which the Node.js server will run
EXPOSE 3000

# Set environment variables for the application (if needed)
# ENV REACT_APP_API_URL=https://your-api-url

# Define the command to run the Node.js server
CMD ["npm", "start"]
