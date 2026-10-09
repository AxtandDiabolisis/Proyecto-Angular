FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY angular.json tsconfig*.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:alpine
RUN addgroup -S web && adduser -S -G web web \
    && rm -f /etc/nginx/conf.d/default.conf \
    && chown -R web:web /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=web:web /app/dist/proyecto-angular/browser /usr/share/nginx/html
USER web
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
