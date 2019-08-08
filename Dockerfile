FROM node:12-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 5555
CMD [ "npm", "run", "start:prod" ]
