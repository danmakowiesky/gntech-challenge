FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "./bin/www" ]