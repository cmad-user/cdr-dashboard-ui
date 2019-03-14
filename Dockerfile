FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .env .
COPY /public /usr/src/app/public
COPY /src /usr/src/app/src
COPY config-overrides.js .
COPY package.json .
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

CMD [ "npm", "start" ]