FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

CMD npx prisma db push && yarn run dev