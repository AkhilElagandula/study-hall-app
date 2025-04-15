

import type { ApiResponse, Payload } from "@/types/types"

const handler = async <T = any>(
  method: string,
  url: string,
  payload: Payload,
  token: string,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse<T>> => {

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(payload) : undefined,
    cache: "no-cache",
  };

  showLoader && showLoader();

  try {
    const response = await fetch(url, options);

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const apiResponse: ApiResponse<T> = await response.json();
      return apiResponse;
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response format: ${text}`);
    }
  } catch (error) {
    console.log(`Request to ${url} failed:`, error);
    throw error;
  } finally {
    hideLoader && hideLoader();
  }
};

export default handler;