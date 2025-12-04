import axios from "axios";

export async function refreshTokenRequest(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(
    "https://dummyjson.com/auth/refresh",
    { refreshToken },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.accessToken;
}
