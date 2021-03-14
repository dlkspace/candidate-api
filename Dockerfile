FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm" ,"run", "start"]

EXPOSE 8626