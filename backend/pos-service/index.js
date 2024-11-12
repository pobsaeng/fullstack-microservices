const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const saleHandler = require('./handler/saleHandler');
const dotenv = require('dotenv');

// Initial load of default .env file
dotenv.config();

function loadEnv() {
    console.log("IS_RUNNING_IN_DOCKER:", process.env.IS_RUNNING_IN_DOCKER);

    // Determine which .env file to load based on the environment
    let envFile = '.env.local';
    if (process.env.IS_RUNNING_IN_DOCKER === 'true') {
        envFile = '.env.docker';
    }

    // Check if the specified .env file exists and load it
    if (fs.existsSync(envFile)) {
        dotenv.config({ path: envFile });
        console.log(`Successfully loaded environment variables from ${envFile}`);
    } else {
        console.error(`Error: ${envFile} file not found`);
    }
}

async function main() {
    // Load the appropriate .env file
    loadEnv();

    const app = express();
    const PORT = process.env.APP_PORT || 8087;

    // Set up middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Define your route
    app.post('/api/v1/sale', (req, res) => {
        saleHandler(req, res, process.env.PRODUCT_SVC_URL);
    });

    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Start the application and handle errors
main().catch((error) => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
