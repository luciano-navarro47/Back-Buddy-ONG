# build stage
FROM node:18-alpine AS builder
WORKDIR /app

# instalar dependencias para build
COPY package*.json ./
RUN npm ci

# copiar código y compilar
COPY . .
RUN npm run build

# runtime stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# instalar curl para healthcheck (opcional)
RUN apk add --no-cache curl

# copiar sólo lo necesario
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["node", "dist/index.js"]
