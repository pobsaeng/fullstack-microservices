import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch token and expiration time from the API
export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async ({ username, password }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/authen/generate-token',
        // 'http://middleware:8000/api/v1/authen/generate-token',
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE',  // Include token if necessary
          },
          withCredentials: false,  // If you need credentials like cookies
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  });
/* 
  const expirationTime = expires_in * 1000;
  คูณด้วย 1,000 เพื่อแปลงเป็นมิลลิวินาทีเพื่อให้เข้ากันได้กับ Date.now()
*/
