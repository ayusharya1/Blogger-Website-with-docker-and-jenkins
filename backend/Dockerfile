FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 8080
CMD [ "npx", "nodemon", "./index.js" ]