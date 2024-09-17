FROM node:20-alpine

WORKDIR /app

COPY package.* .

RUN npm install

RUN npm i -g serve

COPY . .

ENV VITE_SERVER_URL=http://localhost:3000

RUN npm run build

EXPOSE 4173

CMD [ "serve", "-s", "dist" , "-l", "4173"]