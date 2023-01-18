FROM node:14

WORKDIR /frontend

RUN npx create-react-app adminwebb

WORKDIR /frontend/adminwebb

RUN npm install react-router-dom react-dom react-leaflet leaflet react-hook-form bootstrap react-bootstrap @react-oauth/google

RUN cp package.json ..

ENTRYPOINT [ "bash", "start.bash" ]