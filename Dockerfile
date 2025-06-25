FROM node:18

WORKDIR /app/notification-service

COPY notification-service/package.json ./

RUN npm install

COPY notification-service/ ./

EXPOSE 4001

CMD [ "npm" ,"run","start"]