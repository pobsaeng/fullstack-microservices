#!/bin/bash

# Enable parallel execution for application services if set to true
PARALLEL=true

# List of application services to run
scripts=(
  "$(pwd)/fullstack-microservices/auth-service/build_and_run.sh"
  "$(pwd)/fullstack-microservices/middleware/build_and_run.sh"
  "$(pwd)/fullstack-microservices/pos-service/build_and_run.sh"
  "$(pwd)/fullstack-microservices/product-service/build_and_run.sh"
)

## Function to execute each script and log output
execute_script() {
    local script=$1
    if [ -f "$script" ]; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting $script"
        bash "$script"
        local exit_code=$?
        if [ $exit_code -eq 0 ]; then
            echo "$(date '+%Y-%m-%d %H:%M:%S') - $script completed successfully."
        else
            echo "$(date '+%Y-%m-%d %H:%M:%S') - $script failed with exit code $exit_code."
        fi
    else
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Error: $script not found!"
    fi
}

## Run application services in parallel or sequentially
if [ "$PARALLEL" = true ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Running application services in parallel..."
    pids=()
    for script in "${scripts[@]}"; do
        execute_script "$script" &  # Run in background
        pids+=($!)  # Capture process ID
    done

    # Wait for all parallel jobs to finish
    for pid in "${pids[@]}"; do
        wait "$pid"
    done
    echo "$(date '+%Y-%m-%d %H:%M:%S') - All parallel jobs completed."
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Running application services sequentially..."
    for script in "${scripts[@]}"; do
        execute_script "$script"
    done
fi

#### Command to run script ####
# ./deploy_microservices_docker.sh
