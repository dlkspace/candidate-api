FROM node:12.4-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

RUN npm run build

CMD [ "node", "dist/app.js" ]

EXPOSE 8626