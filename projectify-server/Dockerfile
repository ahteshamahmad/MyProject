# Use a lightweight base image with Java 17
FROM maven:3.9.0-eclipse-temurin-17-alpine AS build
COPY . .
RUN mvn clean package

FROM openjdk:17
COPY --from=build /target/projectify-server.jar projectify-server.jar
EXPOSE 1010
ENTRYPOINT ["java","-jar","projectify-server.jar"]
