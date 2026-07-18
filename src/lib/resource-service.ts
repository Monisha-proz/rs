import { apiClient } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/types/api";

type Identifiable = { id: string };

function toSearchParams(params: Record<string, string | number | boolean | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== "") search.set(key, String(value));
  return search.toString();
}

/** Standard REST service for schema resources with list/create/update endpoints. */
export function createResourceService<TEntity extends Identifiable, TCreate, TUpdate = Partial<TCreate>, TParams extends ListParams = ListParams>(endpoint: string) {
  return {
    list: (params: TParams = {} as TParams, signal?: AbortSignal) => {
      const query = toSearchParams(params);
      return apiClient<PaginatedResponse<TEntity>>(`${endpoint}${query ? `?${query}` : ""}`, { signal });
    },
    create: (input: TCreate) => apiClient<TEntity>(endpoint, { method: "POST", body: JSON.stringify(input) }),
    update: (id: string, input: TUpdate) => apiClient<TEntity>(`${endpoint}/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  };
}
