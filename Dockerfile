# Get the nodejs from docker-hub
FROM node:18-alpine

# Create app directory
RUN mkdir -p /app

# Make working directory for this app
WORKDIR /app

# Copy app dependencies
COPY package.json /app

# Install app dependencies
RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . /app

# Start the application
CMD ["npm", "start"]