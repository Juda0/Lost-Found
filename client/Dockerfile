FROM node:14-alpine

WORKDIR /app

COPY client/package*.json ./client/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]