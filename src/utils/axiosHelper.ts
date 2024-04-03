// utils/axiosHelper.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// @TODO talal: this should be an environment variable
// const API_BASE_URL = `http://localhost:3000/api`;
// @ts-ignore
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';



// Set global config defaults for axios
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 10000; // 10 seconds timeout

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// @Todo Talal - Have to check session before making request
// const getAuthHeader = (): { Authorization?: string } => {
//   // Placeholder for your auth token retrieval logic, e.g., from local storage
//   const token = localStorage.getItem('token');
//   if (token) {
//     return { Authorization: `Bearer ${token}` };
//   }
//   return {};
// };

export async function axiosHelper<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    // Include authorization header if needed
    // const headers = { ...config.headers, ...getAuthHeader() };

    const response: AxiosResponse<T> = await axios({
      ...config,
      headers: {
        ...config.headers
      }
    });
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // More detailed error handling & parsing
      const parsedError = error.response?.data || error.message;
      return {
        error:
          typeof parsedError === 'string'
            ? parsedError
            : JSON.stringify(parsedError)
      };
    }
    return { error: 'An unexpected error occurred' };
  }
}
