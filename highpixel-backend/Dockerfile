FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 4000
CMD ["node", "dist/infra/http/server.js"]
