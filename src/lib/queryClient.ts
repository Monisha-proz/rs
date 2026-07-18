import { QueryClient } from "@tanstack/react-query";

/** Create a client per browser session; avoids sharing cache across SSR requests. */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  });
}
