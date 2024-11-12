const axios = require("axios");

const headers = {
  'Content-Type': 'application/json',
  'X-User-ID': 'myUser@gmail.com',
};

// Axios configuration for handling timeouts and retries
const axiosInstance = axios.create({
  timeout: 5000, // Timeout of 5 seconds
  retry: 3, // Retry 3 times on failure
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Exponential backoff delay
  }
});

// Handler for errors and retries
axiosInstance.interceptors.response.use(undefined, (err) => {
  const { config, response } = err;
  if (response && response.status === 500) {
    // Retry only on 500 Internal Server Error
    return axiosInstance(config);
  }
  throw err;
});

async function getProductDetails(code, serviceURL) {
  console.log("getProductDetails() - serviceURL: ", serviceURL);
  try {
    const response = await axiosInstance.get(`${serviceURL}/code/${code}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error retrieving product with code "${code}": ${error.message}`);
  }
}

async function updateProductStock(code, amount, serviceURL) {
  console.log("updateProductStock() - serviceURL: ", serviceURL);
  try {
    console.log("[updateProductStock] code:", code, ", amount:", amount);
    // Sending a PATCH request to update the stock for a specific product
    await axiosInstance.put(
      `${serviceURL}/code/${code}/stock`,
      { amount },
      { headers }
    );

  } catch (error) {
    throw new Error(`Error updating stock for product with code "${code}": ${error.message}`);
  }
}

module.exports = { getProductDetails, updateProductStock };
