###
### STEP 1 — Build stage
###
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json + lockfile FIRST so docker caching works
COPY package.json package-lock.json ./

# Install dependencies exactly as in lockfile
RUN npm ci

# Copy the rest of the application
COPY . .

# Ensure Prisma schema & client exist BEFORE generating
# (prisma directory is already included from COPY . .)
RUN npx prisma@6.16.2 generate

# Build Nuxt application
RUN npm run build


###
### STEP 2 — Runtime stage
###
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy only what runtime needs
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

