import {jwtDecode} from "jwt-decode";

// Function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; // Check if token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat invalid tokens as expired
  }
};

// Function to get the token and set headers
export const setHeaders = () => {
  try {
    // Get user info from localStorage
    const storedUserInfo = JSON.parse(localStorage.getItem("auth"));
    if (!storedUserInfo || !storedUserInfo.userInfo) {
      window.location.href = "/login";
      console.error("No user info or token found in local storage");
      throw new Error("Token missing");
    }

    const { access_token: token } = storedUserInfo.userInfo;
    // Check if the token is expired
    if (isTokenExpired(token)) {
      console.warn("Token is expired, redirecting to login...");
      window.location.href = "/login";
      throw new Error("Token expired");
    }

    // Set headers with Authorization and custom headers
    return {
      Authorization: `Bearer ${token}`,
      // "X-Custom-Header": "Phob@#12$",
      "X-User-ID": "myUser@gmail.com",
    };
  } catch (error) {
    console.error("Error setting headers:", error.message);
    return error;
  }
};
