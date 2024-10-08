FROM node:20-alpine AS setup
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Build stage
FROM setup AS build
WORKDIR /usr/src/app
COPY . .
RUN npm run build:webpack

# Production stage
FROM alpine as production
RUN apk add --update nodejs
ENV NODE_ENV production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main"]