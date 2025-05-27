# Тестовое задание для DevOps
# 🎯 Цель

Оценить способность кандидата самостоятельно выстроить полный цикл CI/CD, включая:
- автоматическую сборку и тестирование,
- контейнеризацию,
- деплой,
- мониторинг и логирование,
- реализацию rollback-стратегий.

# Sausage Store

![image](https://user-images.githubusercontent.com/9394918/121517767-69db8a80-c9f8-11eb-835a-e98ca07fd995.png)


## Technologies used

* Frontend – TypeScript, Angular.
* Backend  – Java 16, Spring Boot, Spring Data.
* Database – H2.

## Installation guide
### Backend

Install Java 16 and maven and run:

```bash
cd backend
mvn package
cd target
java -jar sausage-store-0.0.1-SNAPSHOT.jar
```

### Frontend

Install NodeJS and npm on your computer and run:

```bash
cd frontend
npm install
npm run build
npm install -g http-server
sudo http-server ./dist/frontend/ -p 80 --proxy http://localhost:8080
```

Then open your browser and go to [http://localhost](http://localhost)

# ✅ Задачи

## 1. Контейнеризация
	•	Создать Dockerfile для фронтенда и бэкенда.
	•	Настроить docker-compose.yml для совместного запуска компонентов.
	•	Обеспечить возможность запуска приложения одной командой.

## 2. CI
	•	Настроить CI-пайплайн (например, GitHub Actions), который:
	•	собирает и тестирует фронтенд и бэкенд,

## 3. Мониторинг и логирование
	•	Интегрировать Prometheus для сбора метрик с бэкенда.
	•	Настроить Grafana для визуализации метрик.
	•	Настроить централизованное логирование (например, с использованием ELK-стека или Loki).

## 4. Документация
	•	Подготовить README.md с инструкциями по:
	•	сборке и запуску приложения,
	•	работе CI пайплайна,
	•	настройке мониторинга и логирования,
# 📬 Формат сдачи
Публичный GitHub репозиторий с реализованными задачами (можно сделать fork от этого репозитория).

## Результат
Создал Dockerfile для фронтенда и бэкенда, docker-compose для описания контейнеров. Собрал CI пайплайн для тестов, включил все найденные *spec.ts для фронтенда. Настроил Prometheus, Grafana, Loki для сбора метрик и мониторинга.

Grafana: http://localhost:3000/ log/pass: admin/admin
Prometheus: http://localhost:9090, метрики - http://localhost:8080/actuator/prometheus, таргеты - http://localhost:9090/targets

Для просмтра метрик с Prometheus [Home -> Dashboards](http://localhost:3000/dashboards)
Для просмотра метрик с Loki http://localhost:3000/, переключаемся на Code и выбираем контейнер, например {container="backend"}, жмем "Run Query"

## Запуск приложения
```bash
git clone git@github.com:manukhov/Test_service.git
cd Test_service
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
docker compose up --build
```
#  CI Pipeline 

###  Backend
1. Использует Ubuntu (`ubuntu-latest`) как среду выполнения
3. Клонирует репозиторий 
4. Устанавливает JDK 17
5. Собирает проект через Maven
6. Запускает юнит-тесты
   
### Frontend
1. Использует Ubuntu как среду выполнения
2. Клонирует репозиторий
3. Устанавливает Node.js 16
4. Чистит npm-кэш
5. Устанавливает Google Chrome
6. Проверяет версию Chrome
7. Устанавливает зависимости: `npm ci`
8. Устанавливает Protractor глобально
9. Скачивает нужную версию ChromeDriver и кладёт в `webdriver-manager`
10. Создаёт `update-config.json`, чтобы указать нужный путь к ChromeDriver
11. Логирует версию Chrome, ChromeDriver и проверяет структуру
12. Ищет и отображает список `*.spec.ts` и `*.e2e-spec.ts`
13. Проверяет версии Karma, Angular CLI, Protractor
14. Собирает проект: `npx ng build`
15. Запускает юнит-тесты через Karma + ChromeHeadless
16. Убивает процессы, если что-то висит на портах `7860`, `8080`, т.к. порты оказываются заняты
17. Запускает backend
18. Проверяет, что backend запущен
19. Запускает `ng serve` на 7860 порту
20. Ждёт 10 секунд на запуск фронта
21. Запускает E2E тесты через Protractor (без обновления WebDriver)
22. Проверяет результаты тестов, логирует coverage
23. Загружает coverage-отчёт

### P.S. Chrome-Driver пришлось качать и ставить руками, потому-что webdriver-manager ставил старый и E2E тесты запарывались, требуя новую версию.
