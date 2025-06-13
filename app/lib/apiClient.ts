const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuthHeader: boolean = true
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
  if (token && includeAuthHeader) { 
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as T; // Handle no content
  }

  return response.json();
}