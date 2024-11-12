#!/bin/bash

# Run the deploy_database_docker.sh script and wait for it to finish
./database/deploy_database_docker.sh

# Check if the database deployment was successful (optional but recommended)
if [ $? -eq 0 ]; then
    echo "Database deployment completed successfully."

    # Now run the deploy_microservices_docker.sh script
    ./backend/deploy_microservices_docker.sh
    ./frontend/deploy_frontend_docker.sh
else
    echo "Database deployment failed. Skipping microservices deployment."
    exit 1  # Optionally exit if the database deployment fails
fi

#### Command to run script ####
# ./deploy_all_app.sh