# Install dependencies only when needed
FROM node:24.3.0-alpine3.22 AS devdependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:24.3.0-alpine3.22 AS builder
WORKDIR /app
COPY --from=devdependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:24.3.0-alpine3.22 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD ["node", "dist/main"]