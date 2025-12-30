
FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet

COPY ./images/api ./ 

CMD ["npm", "start"]