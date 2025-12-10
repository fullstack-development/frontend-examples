FROM node:24-alpine AS builder

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  eudev-dev \
  linux-headers

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine AS runner

# Удаляем дефолтную конфигурацию nginx
RUN rm -f /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Копируем собранное приложение
COPY --from=builder /app/dist ./

# Копируем кастомную конфигурацию nginx
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Проверяем что файлы скопировались
RUN ls -la /usr/share/nginx/html && \
    ls -la /etc/nginx/conf.d/ && \
    cat /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
    