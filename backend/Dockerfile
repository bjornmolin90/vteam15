FROM node:14

WORKDIR /server

COPY *.json ./

RUN npm install

RUN npm install -g nodemon

ENTRYPOINT ["nodemon", "--legacy-watch", "./index/index.js"]