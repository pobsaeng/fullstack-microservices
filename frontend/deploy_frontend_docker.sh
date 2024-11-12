#!/bin/bash

cd "$(dirname "$0")" || exit 1

scripts=(
  "$(pwd)/reactweb/build_and_run.sh"
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

echo "$(date '+%Y-%m-%d %H:%M:%S') - Running frontend application..."
for script in "${scripts[@]}"; do
    execute_script "$script"
done

#### Command to run script ####
# ./deploy_frontend_docker.sh
