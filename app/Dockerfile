FROM node:8.6

RUN mkdir -p /app

COPY package.json /app/package.json
COPY webpack.*.js /app/

WORKDIR /app

RUN npm install
