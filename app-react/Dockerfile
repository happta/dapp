FROM node:8.6

RUN mkdir -p /app-react

RUN ls
COPY package.json /app-react/package.json
COPY webpack.*.js /app-react/

WORKDIR /app-react

RUN npm install
