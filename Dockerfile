FROM node:10.18.0-alpine3.11 AS build

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

RUN npm prune --production

FROM node:10.18.0-alpine3.11

EXPOSE 8090
WORKDIR /usr/src/service

COPY --from=build /src/dist dist

USER node

WORKDIR /usr/src/service/dist

CMD ["node", "./src/index.js"]