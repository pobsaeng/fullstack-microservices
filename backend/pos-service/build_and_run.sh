#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Change to the directory containing this script
cd "$(dirname "$0")" || exit 1

# Configuration variables
NETWORK_NAME="pos_sys_network"
CONTAINER_NAME="pos"
IMAGE_NAME="pos"
PORT_NUMBER="8087"

# Function to check if a required file exists
check_file_exists() {
    local file=$1
    if [[ ! -f $file ]]; then
        echo "Error: $file not found in $(pwd)"
        exit 1
    fi
}

# Function to create Docker network if it doesn't exist
create_network() {
    if ! docker network inspect "$NETWORK_NAME" > /dev/null 2>&1; then
        echo "Creating Docker network: $NETWORK_NAME"
        docker network create "$NETWORK_NAME"
    else
        echo "Docker network $NETWORK_NAME already exists."
    fi
}

# Function to build Docker image
build_image() {
    echo "Building Docker image: $IMAGE_NAME"
    docker build -t "$IMAGE_NAME" .
}

# Function to remove existing Docker container if it exists
remove_existing_container() {
    if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
        echo "Removing existing container: $CONTAINER_NAME"
        docker rm -f "$CONTAINER_NAME"
    fi
}

# Function to run Docker container
run_container() {
    echo "Starting Docker container: $CONTAINER_NAME"
    docker run -d \
        --name "$CONTAINER_NAME" \
        --network "$NETWORK_NAME" \
        -p "$PORT_NUMBER":"$PORT_NUMBER" \
        --env-file .env \
        "$IMAGE_NAME"
    echo "Docker container $CONTAINER_NAME started successfully on port $PORT_NUMBER."
}

# Main script execution
echo "Starting deployment script..."

# Check if necessary files exist
check_file_exists "Dockerfile"
check_file_exists ".env"

# Execute main functions
create_network
build_image
remove_existing_container
run_container

echo "Deployment script completed successfully."

chmod +x build_and_run.sh