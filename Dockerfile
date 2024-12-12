# dev stage
FROM node:20 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

# production stage
FROM base as production

ENV NODE_PATH=./dist

RUN npm run build
