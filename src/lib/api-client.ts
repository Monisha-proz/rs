import type { ApiResponse } from "@/types/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(path, {
    ...init,
    headers,
  });
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | { message?: string } | null;
  if (!response.ok) throw new ApiError(response.status, body?.message ?? "Something went wrong. Please try again.");
  return (body as ApiResponse<T>).data ?? (body as T);
}
