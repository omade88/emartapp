# --------------------------------------
# 1️⃣ Build Stage (Maven + JDK 17)
# --------------------------------------
FROM eclipse-temurin:17-jdk AS build
WORKDIR /usr/src/app/

# install maven
RUN apt-get update && apt-get install -y maven && apt-get clean

# Copy everything
COPY . .

# Build application
RUN mvn clean package -DskipTests


# --------------------------------------
# 2️⃣ Run Stage
# --------------------------------------
FROM eclipse-temurin:17-jdk
WORKDIR /usr/src/app/

# Copy JAR from build stage
COPY --from=build /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

EXPOSE 9000
ENTRYPOINT ["java", "-jar", "book-work-0.0.1.jar"]




#FROM openjdk:8 AS BUILD_IMAGE
#WORKDIR /usr/src/app/
#RUN apt update && apt install maven -y
#COPY ./ /usr/src/app/
#RUN mvn install -DskipTests

#FROM openjdk:8

#WORKDIR /usr/src/app/
#COPY --from=BUILD_IMAGE /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

#EXPOSE 9000
#ENTRYPOINT ["java","-jar","book-work-0.0.1.jar"]
# Test

