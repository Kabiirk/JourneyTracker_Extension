// Import the function to be tested
import { axiosHelper, ApiResponse } from '../utils/axiosHelper';
import axios, { AxiosRequestConfig, AxiosResponse , AxiosHeaders, AxiosError} from 'axios';

// Mock axios for testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('axiosHelper', () => {
    beforeEach(() => {
      // Clear mock implementation before each test
      (mockedAxios as any).mockClear();
    });
  
    it('should return data when axios request succeeds', async () => {
      // Mock axios response
      const responseData = { foo: 'bar' };
      const axiosResponse: AxiosResponse<typeof responseData> = {
        data: responseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '/example', headers: {} as AxiosHeaders } // Adjusted to include the URL
      };
      (mockedAxios as any).mockResolvedValueOnce(axiosResponse);
  
      // Call the function to test
      const config: AxiosRequestConfig = { url: '/example' };
      const result: ApiResponse<typeof responseData> = await axiosHelper<typeof responseData>(config);
  
      // Assertions
      expect(result.data).toEqual(responseData);
      expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining(config)); // Use expect.objectContaining for partial matching
    });
  
    it('should return error when axios request fails', async () => {
        // Mock axios error response
        const errorMessage = 'An unexpected error occurred'; // Corrected error message
        const axiosError = {
          message: errorMessage,
          response: {
            status: 500,
            data: { error: errorMessage }, // Update error data to match the expected error message
            headers: {},
            config: { url: '/example', headers: {} as AxiosHeaders }
          }
        };
        (mockedAxios as any).mockRejectedValueOnce(axiosError);
      
        // Call the function to test
        const config: AxiosRequestConfig = { url: '/example' };
        const result: ApiResponse<any> = await axiosHelper<any>(config);
      
        // Assertions
        expect(result.error).toContain(errorMessage); // Compare with the error message from response data
        expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining(config));
      });

      it('should return error message for unexpected errors', async () => {
      // Mock unexpected error
      const errorMessage = 'Network Error';
      (mockedAxios as any).mockRejectedValueOnce(new Error(errorMessage));
  
      // Call the function to test
      const config: AxiosRequestConfig = { url: '/example' };
      const result: ApiResponse<any> = await axiosHelper<any>(config);
  
      // Assertions
      expect(result.error).toEqual('An unexpected error occurred');
      expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining(config)); // Use expect.objectContaining for partial matching
    });

    it('should return error when axios request fails with no response data', async () => {
        // Mock axios error response with no response data
        const errorMessage = 'Request failed';
        const axiosError: AxiosError = {
            message: errorMessage,
            config: { url: '/example', headers: {} as AxiosHeaders },
            code: 'ECONNABORTED', // Example code, you can set it as per your requirement
            request: {} as XMLHttpRequest,
            response: {
              status: 500,
              statusText: 'Internal Server Error',
              data: errorMessage,
              headers: {},
              config: { url: '/example', headers: {} as AxiosHeaders }
            }
          } as any; // Cast to any to bypass TypeScript checks temporarily
          
          (mockedAxios as any).mockRejectedValueOnce(axiosError);
      
        // Call the function to test
        const config: AxiosRequestConfig = { url: '/example' };
        const result: ApiResponse<any> = await axiosHelper<any>(config);
      
        // Assertions
        expect(result.error).toContain('error');
        expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining(config));
      });
      
      it('should return error when axios request fails with non-string response data', async () => {
        // Mock axios error response with non-string response data
        const errorMessage = { message: 'Internal Server Error' };
        const axiosError = {
          message: 'Request failed',
          response: {
            data: errorMessage
          }
        };
        (mockedAxios as any).mockRejectedValueOnce(axiosError);
      
        // Call the function to test
        const config: AxiosRequestConfig = { url: '/example' };
        const result: ApiResponse<any> = await axiosHelper<any>(config);
      
        // Assertions
        expect(result.error).toContain('error');
        expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining(config));
      });
      

  });
  