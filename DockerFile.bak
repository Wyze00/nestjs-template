FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .
COPY .env.docker /app/.env

RUN npx prisma generate
RUN npm run build

CMD npx prisma migrate deploy && npm run start