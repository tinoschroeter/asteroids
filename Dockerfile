FROM nginx:1.21.3-alpine AS frontend

WORKDIR /usr/share/nginx/html
COPY frontend .

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

FROM node:gallium-bullseye-slim AS backend

WORKDIR /app
COPY backend .

RUN npm install

CMD ["node", "index.js"]
