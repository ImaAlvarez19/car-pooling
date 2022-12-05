FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci && npm install typescript -g

COPY . .

EXPOSE 9091
RUN npm run build
CMD [ "npm", "start" ]