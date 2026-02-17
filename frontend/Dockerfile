FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


COPY . .
ARG NEXT_PUBLIC_BLOCK_ID
ARG NEXT_PUBLIC_BLOCK_ID_INIT
ENV NEXT_PUBLIC_BLOCK_ID=$NEXT_PUBLIC_BLOCK_ID
ENV NEXT_PUBLIC_BLOCK_ID_INIT=$NEXT_PUBLIC_BLOCK_ID_INIT

RUN npm run build


FROM node:20-alpine as runner 

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm ci --omit=dev

# Копируем сборку и  Нужные файлы из предыдущего этапа
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]