# Этап сборки
FROM node:16 AS build

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Чистая установка зависимостей
RUN npm install

# Копируем весь исходный код
COPY . .

# Собираем проект
RUN npm run build

# Этап запуска (runtime)
FROM node:18-alpine

WORKDIR /app

# Устанавливаем http-server глобально
RUN npm install -g http-server

# Копируем собранный фронтенд из этапа сборки
COPY --from=build /app/dist/frontend ./dist/frontend

# Открываем порт 80
EXPOSE 80

# Запускаем http-server в папке dist/frontend на порту 80
CMD ["http-server", "dist/frontend", "-p", "80", "--proxy", "http://backend:8080"]
