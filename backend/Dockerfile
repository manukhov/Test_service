FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/sausage-store-0.0.1-SNAPSHOT.jar sausage-store-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "sausage-store-0.0.1-SNAPSHOT.jar"]
