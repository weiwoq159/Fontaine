import { invoke as tauriInvoke } from "@tauri-apps/api/core";

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export async function invokeCommand<T>(
  command: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  return tauriInvoke<T>(command, payload);
}

export async function invokeApiCommand<T>(
  command: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  const response = await invokeCommand<ApiResponse<T>>(command, payload);

  if (!response.ok || response.data === undefined) {
    throw new Error(response.error ?? `Command failed: ${command}`);
  }

  return response.data;
}
