import axios, { AxiosInstance } from "axios";
import Swal from "sweetalert2";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Endpoint, site } from "../configs/url.config";

export interface ApiResponse {
  status_code: number;
  isFirstTimeVerify?: boolean;
  valid: boolean;
  detail?: Record<string, any>;
  html?: string;
  title_mess: Record<string, string>;
  text_mess: Record<string, string>;
  captchaUrl?: string;
  token?: string;
  message?: string;
  success?: boolean;
}

// Define the Axios instance with a custom configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: Endpoint, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
// Request Interceptor
axiosInstance.interceptors.request.use(
 async (config) => {
    const defaultSite = site;

    // Add the default `site` parameter if it's not already present in the URL
    const url = new URL(config.url ?? "", config.baseURL);
    if (!url.searchParams.has("site")) {
      url.searchParams.append("site", defaultSite);
      config.url = url.toString().replace(config.baseURL ?? "", ""); // Reconstruct the relative URL
    }
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    config.headers["fingerprint"] = result.visitorId;
    /* Uncomment and adjust this for authorization if needed
    const token = "Bearer " + ttkm_authToken;
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    */
    return config;
  },
  (error) => Promise.reject(error) // Reject request errors
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Return successful responses
  async (error) => {
    if (error.response) {
      const data: ApiResponse = error.response.data
      // Handle other error responses
      Swal.fire({
        icon: "error",
        confirmButtonText: "Confirm",
        title: data.message,
        text: data.message,
      });
      // About auth 
    } else {
      // Handle network or connection issues
      Swal.fire({
        icon: "error",
        confirmButtonText: "Confirm",
        title: error.message,
        text: "Unable to connect to the server. Please check your connection and try again.",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Proof of the successful CAPTCHA step, scoped to a promotion and API path.
const redemptionProofs = new Map<string, string>();
axiosInstance.interceptors.response.use(response => {
  const url = new URL(response.config.url ?? "", response.config.baseURL);
  if (/\/api\/(client|team)\/get-code$/.test(url.pathname) && response.data?.valid === true) {
    const body = typeof response.config.data === "string" ? JSON.parse(response.config.data) : response.config.data;
    const promo = url.searchParams.get("promo_code");
    if (promo && typeof body?.token === "string") redemptionProofs.set(url.pathname.split("/")[1] + ":" + promo, body.token);
  }
  return response;
});
axiosInstance.interceptors.request.use(config => {
  const url = new URL(config.url ?? "", config.baseURL);
  if (/\/user\/?$/.test(url.pathname)) {
    const key = url.pathname.split("/")[1] + ":" + config.data?.promo_id;
    const proof = redemptionProofs.get(key);
    if (proof) config.headers["x-redemption-token"] = proof;
    redemptionProofs.delete(key);
  }
  return config;
});
