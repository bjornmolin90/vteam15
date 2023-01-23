FROM node:14

WORKDIR /frontend

RUN npx create-react-app customerwebb

WORKDIR /frontend/customerwebb

RUN npm install react-dom react-router-dom bootstrap react-bootstrap react-hook-form

RUN cp package.json ..

ENTRYPOINT [ "bash", "start.bash" ]