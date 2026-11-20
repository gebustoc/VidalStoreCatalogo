FROM node:24-slim AS builder
WORKDIR /data
COPY *.json .
RUN npm ci
COPY src/ ./src
RUN npm run build && npm prune --omit=dev


FROM node:24-slim AS runner

WORKDIR /app
COPY --from=builder /data/dist .
COPY --from=builder /data/node_modules ./node_modules
RUN mkdir -p mocks
EXPOSE 3000
CMD [ "node", "./main.js" ]
