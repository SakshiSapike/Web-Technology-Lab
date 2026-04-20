# Employee Task Management System

This project is a Spring Boot based Employee Task Management System that can be built and run with either Maven or Gradle.

## Prerequisites

- Java 17
- Maven 3.9+ for Maven builds
- Gradle 8+ for Gradle builds

## Maven Lifecycle

Build and test:

```bash
mvn clean test
```

Create the executable JAR:

```bash
mvn clean package
```

Run the app:

```bash
mvn spring-boot:run
```

Launch the generated JAR:

```bash
java -jar target/taskmanagement-1.0.jar
```

## Gradle Lifecycle

Build and test:

```bash
gradle clean test
```

Create the executable JAR:

```bash
gradle clean bootJar
```

Run the app:

```bash
gradle bootRun
```

Launch the generated JAR:

```bash
java -jar build/libs/taskmanagement-1.0.jar
```

## Application Details

- Main class: `org.college.taskmanagement.TaskManagementApplication`
- Port: `8081`
- Database: in-memory H2
- Web UI: `src/main/resources/static/index.html`
