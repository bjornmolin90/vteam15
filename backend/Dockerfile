FROM node:14

WORKDIR /server

COPY ./index.js .

RUN npm init -y

RUN npm install express express-session nodemon body-parser cors dotenv geolib morgan mysql2 random-location passport passport-google-oauth20 express-session --save node-cron --save-dev jest

ENTRYPOINT ["node", "node_modules/nodemon/bin/nodemon.js"]