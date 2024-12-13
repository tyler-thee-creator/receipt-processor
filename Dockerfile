# dev stage
FROM node:20 AS base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

# production stage
FROM base AS production

ENV NODE_PATH=./dist

RUN npm run build
