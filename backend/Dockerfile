# ---------- BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- RUN ----------
FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/config ./config
COPY --from=build /app/seeders ./seeders
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/.sequelizerc ./.sequelizerc 



EXPOSE 9004


CMD ["npm", "run", "start"]
