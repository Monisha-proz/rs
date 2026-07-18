"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ListParams, PaginatedResponse } from "@/types/api";

type Identifiable = { id: string };
type ResourceService<TEntity extends Identifiable, TCreate, TUpdate, TParams extends ListParams> = {
  list: (params: TParams, signal?: AbortSignal) => Promise<PaginatedResponse<TEntity>>;
  create: (input: TCreate) => Promise<TEntity>;
  update: (id: string, input: TUpdate) => Promise<TEntity>;
};

export function createResourceKeys(resource: string) {
  const all = [resource] as const;
  return {
    all,
    lists: () => [...all, "list"] as const,
    list: (params: ListParams = {}) => [...all, "list", params] as const,
    details: () => [...all, "detail"] as const,
    detail: (id: string) => [...all, "detail", id] as const,
  };
}

export function useResourceList<TEntity extends Identifiable, TCreate, TUpdate, TParams extends ListParams>(keys: ReturnType<typeof createResourceKeys>, service: ResourceService<TEntity, TCreate, TUpdate, TParams>, params: TParams) {
  return useQuery({ queryKey: keys.list(params), queryFn: ({ signal }) => service.list(params, signal) });
}

export function useCreateResource<TEntity extends Identifiable, TCreate, TUpdate, TParams extends ListParams>(keys: ReturnType<typeof createResourceKeys>, service: ResourceService<TEntity, TCreate, TUpdate, TParams>) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: service.create, onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }) });
}

export function useUpdateResource<TEntity extends Identifiable, TCreate, TUpdate, TParams extends ListParams>(keys: ReturnType<typeof createResourceKeys>, service: ResourceService<TEntity, TCreate, TUpdate, TParams>) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, input }: { id: string; input: TUpdate }) => service.update(id, input), onSuccess: (_, { id }) => Promise.all([queryClient.invalidateQueries({ queryKey: keys.lists() }), queryClient.invalidateQueries({ queryKey: keys.detail(id) })]) });
}
