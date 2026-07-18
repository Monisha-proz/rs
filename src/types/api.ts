export type ApiResponse<T> = { data: T; message?: string };

export type PaginatedResponse<T> = {
  data: T[];
  meta: { page: number; pageSize: number; total: number; pageCount: number };
};

export type ListParams = { page?: number; pageSize?: number; search?: string };
