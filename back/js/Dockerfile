FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --unsafe-perm=true

COPY . .

EXPOSE 1234

CMD ["npm", "run", "dev"]