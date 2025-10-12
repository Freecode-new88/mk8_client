import axiosInstance, { ApiResponse } from "./axiosInstance";
import { site } from "../configs/url.config";

export const getCodeClient = async (promo_code: String,  data: Record<string, string>): Promise<ApiResponse> => {
  try {
    let path = "/mk8/api/client/get-code?promo_code="+promo_code;
    const response = await axiosInstance.post<ApiResponse>(path, data);
    return response.data;
  } catch (error) {
      console.error("Error fetching groups:", error);
    // Optionally, handle specific error scenarios or throw the error
    throw new Error("Failed to fetch groups. Please try again later.");
  }
};

export const addCodeClient = async (promo_code?: string, player_id?: string, fp?: string): Promise<ApiResponse> => {
  try {
    let path = `/mk8/user`;
    const payload = {
      promo_id: promo_code,
      account: player_id,
      site: site,
      fp: fp ?? "unknown"
    };
    
    const response = await axiosInstance.post<ApiResponse>(path, payload);
    return response.data;
  } catch (error) {
    // console.error("Error fetching groups:", error);
    // Optionally, handle specific error scenarios or throw the error
    throw new Error("Failed to fetch groups. Please try again later.");
  }
};
