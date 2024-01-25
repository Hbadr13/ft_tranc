FROM node:lts

COPY package*.json ./

RUN npm install

COPY . /fontend

WORKDIR /fontend

EXPOSE 3000

CMD [ "npm", "run", "dev"]
