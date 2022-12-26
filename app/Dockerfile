FROM node:alpine

# Create app directory

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . ./

CMD ["npm","start"]
