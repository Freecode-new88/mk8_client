import axiosInstance, { ApiResponse } from "./axiosInstance";

export const getCodeClient = async (promo_code: String,  data: Record<string, string>): Promise<ApiResponse> => {
  try {
    let path = "/new88/api/client/get-code?promo_code="+promo_code;
    const response = await axiosInstance.post<ApiResponse>(path, data);
    return response.data;
  } catch (error) {
      console.error("Error fetching groups:", error);
    // Optionally, handle specific error scenarios or throw the error
    throw new Error("Failed to fetch groups. Please try again later.");
  }
};

export const addCodeClient = async (promo_code?: string, player_id?: string): Promise<ApiResponse> => {
  try {
    let path = `/client/?promo_code=${promo_code}&player_id=${player_id}`;
    
    const response = await axiosInstance.post<ApiResponse>(path);
    return response.data;
  } catch (error) {
    // console.error("Error fetching groups:", error);
    // Optionally, handle specific error scenarios or throw the error
    throw new Error("Failed to fetch groups. Please try again later.");
  }
};
