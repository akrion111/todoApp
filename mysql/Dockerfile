FROM mysql:8.0.21

ENV MYSQL_USER=akrioon
ENV MYSQL_PASSWORD=Quakiki01

COPY /mysql/db_init.sql /docker-entrypoint-initdb.d/create_microservice-specific_databases.sql
