# Step 1: Build the app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Run the app
FROM node:20-alpine AS runtime
WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

