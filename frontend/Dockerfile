FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src/

COPY package.json .

RUN npm install

COPY . /app/src/

EXPOSE 3001

CMD ["npm", "start"]