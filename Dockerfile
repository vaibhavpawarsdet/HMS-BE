FROM node:18

WORKDIR /HMS-BE

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]