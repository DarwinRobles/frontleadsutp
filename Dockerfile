FROM node:22.12-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --configuration=production


FROM nginx:alpine



COPY --from=builder /app/dist/leadsfront /usr/share/nginx/html


EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
