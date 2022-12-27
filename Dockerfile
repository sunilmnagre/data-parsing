# Get the nodejs from docker-hub
FROM node:18-alpine

# Create app directory
RUN mkdir -p /data-parser

# Make working directory for this app
WORKDIR /data-parser

# Copy app dependencies
COPY package.json /data-parser

# Install app dependencies
RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . /data-parser

# Start the application
CMD ["npm", "start"]