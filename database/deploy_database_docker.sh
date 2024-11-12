#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
cd "$(dirname "$0")" || exit 1
DB_SCRIPT_1="$(pwd)/mysqldb/build_and_run.sh"
DB_SCRIPT_2="$(pwd)/postgresqldb/build_and_run.sh"

# Function to log messages with timestamps
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Function to execute each script and log output
execute_script() {
    local script=$1
    if [ -f "$script" ]; then
        log_message "Starting => $script"
        bash "$script"
        local exit_code=$?
        if [ $exit_code -eq 0 ]; then
            log_message "$script => completed successfully."
        else
            log_message "$script failed with exit code $exit_code."
        fi
        return $exit_code
    else
        log_message "Error: $script not found!"
        return 1
    fi
}

log_message "Starting database services..."
execute_script "$DB_SCRIPT_1"
execute_script "$DB_SCRIPT_2"

#### Command to run script ####
# ./deploy_database_docker.sh
