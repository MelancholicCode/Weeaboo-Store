FROM node:18.19-alpine3.18 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

FROM node:18.19-alpine3.18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000

CMD [ "yarn", "start:db-push:prod" ]
