# Step 1: Build the app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ✅ Generate Prisma client
RUN npx prisma generate

# Build Nuxt
RUN npm run build

# Step 2: Run the app
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy prisma folder & generated client
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json

COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

