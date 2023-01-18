FROM node:14

WORKDIR /frontend

RUN npx create-react-app customermobile

WORKDIR /frontend/customermobile

RUN npm install react-dom react-router-dom react-burger-menu react-icons

RUN cp package.json ..

ENTRYPOINT [ "bash", "start.bash" ]
