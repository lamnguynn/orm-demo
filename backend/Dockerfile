FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src/

COPY package.json .
COPY ormconfig.json .

RUN npm install

COPY . /app/src/

EXPOSE 3000

CMD ["npm", "start"]
