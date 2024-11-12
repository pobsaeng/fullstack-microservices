#!/bin/bash
set -e

# Database credentials for default superuser
PGUSER=${POSTGRES_USER:-postgres}
PGPASSWORD=${POSTGRES_PASSWORD:-postgres}

# New user and database details
NEW_USER="myPostgres"
NEW_PASSWORD="myP@ss!Z34"
NEW_DATABASE="posdb"

echo "Running custom initialization script to create new user and database..."

# Create a new PostgreSQL user
psql -U "$PGUSER" -c "CREATE USER $NEW_USER WITH PASSWORD '$NEW_PASSWORD';"

# Create a new PostgreSQL database
psql -U "$PGUSER" -c "CREATE DATABASE $NEW_DATABASE;"

# Grant privileges to the new user on the new database
psql -U "$PGUSER" -c "GRANT ALL PRIVILEGES ON DATABASE $NEW_DATABASE TO $NEW_USER;"

# Log completion
echo "User '$NEW_USER' and database '$NEW_DATABASE' created successfully!"
