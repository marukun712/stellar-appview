FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

CMD npx prisma db push && npm run dev