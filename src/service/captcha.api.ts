import { site } from "../configs/url.config";
import axiosInstance, { ApiResponse } from "./axiosInstance";

export const getcaptcha = async (): Promise<ApiResponse> => {
    try {
      let path = `/captcha/get-verification-code?site=${site}`;
      const response = await axiosInstance.get<ApiResponse>(path);
      console.log(response);
      
      return response.data;
    } catch (error) {
      // console.error("Error fetching groups:", error);
      // Optionally, handle specific error scenarios or throw the error
      throw new Error("Failed to fetch groups. Please try again later.");
    }
  };

  export const validateCaptcha = async (data: Record<string, string>): Promise<ApiResponse> => {
    try {
      let path = "/api/validate-captcha";
      const response = await axiosInstance.post<ApiResponse>(path, data);
      return response.data;
    } catch (error) {
      // console.error("Error fetching groups:", error);
      // Optionally, handle specific error scenarios or throw the error
      throw new Error("Failed to fetch groups. Please try again later.");
    }
  };