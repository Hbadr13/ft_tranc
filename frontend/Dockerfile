FROM node:lts
# RUN npm install
# CMD ["sleep", "330000"]



COPY package*.json ./

RUN npm install


#then we build our application
COPY . /fontend/

WORKDIR /fontend/

# RUN npm run build


#exposing the port and run the server
EXPOSE 8080

CMD [ "npm", "run", "serve"]