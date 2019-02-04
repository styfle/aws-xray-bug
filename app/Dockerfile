FROM node:10-alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]