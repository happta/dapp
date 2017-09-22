FROM node:8.1.2

ENV app /contracts/
RUN mkdir -p $app

WORKDIR $app

COPY package.json /contracts/package.json

RUN npm install
