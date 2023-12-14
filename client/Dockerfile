# Use an official Node.js runtime as a base image
FROM node:16 AS react-builder

# Set the working directory in the container
WORKDIR /usr/src/client

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install app dependencies
RUN npm install

# Copy the client source code
COPY client/ ./

# Build the React app
RUN npm run build

# Use a smaller image for the production build
FROM nginx:alpine

# Copy the build from the react-builder stage to the nginx web root
COPY --from=react-builder /usr/src/client/build /usr/share/nginx/html

# Expose the port on which the React app will run
EXPOSE 3000

# The default command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]
