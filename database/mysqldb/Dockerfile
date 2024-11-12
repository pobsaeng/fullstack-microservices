# Use the official MySQL 8.0 image as a base
FROM mysql:8.0

# Copy initialization SQL files into the MySQL Docker entrypoint directory
COPY ./db/schema.sql /docker-entrypoint-initdb.d/1_schema.sql
COPY ./db/data.sql /docker-entrypoint-initdb.d/2_data.sql

# Expose MySQL port
EXPOSE 3306
