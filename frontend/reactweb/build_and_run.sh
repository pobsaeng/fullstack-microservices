#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Change to the directory containing this script
cd "$(dirname "$0")" || exit 1

# Define the path to the Docker Compose file
COMPOSE_FILE="docker-compose.yml"

# Function to check if a file exists
check_file_exists() {
    local file_path="$1"
    if [[ ! -f "$file_path" ]]; then
        echo "Error: $file_path not found!"
        exit 1
    fi
}

# Check if Docker Compose file exists
echo "Checking Docker Compose file..."
check_file_exists "$COMPOSE_FILE"

# Start frontend services with Docker Compose
echo "Starting frontend services using Docker Compose..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Frontend services started successfully."
