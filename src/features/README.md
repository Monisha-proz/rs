# Feature module convention

Create one folder per business capability from the commerce schema: `products`, `categories`, `brands`, `inventory`, `customers`, `cart`, `orders`, `payments`, `coupons`, `offers`, and `settings`.

Each module owns its UI, form schema, columns, and domain-specific hooks. Shared behavior belongs outside features:

| Concern | Reusable location |
| --- | --- |
| API request/error handling | `src/lib/api-client.ts` |
| REST list/create/update service | `src/lib/resource-service.ts` |
| TanStack Query CRUD hooks and query keys | `src/hooks/use-resource.ts` |
| Generic UI primitives/table | `src/components/ui` |
| Cross-feature API/domain types | `src/types` |

Example for a new `brands` resource:

```ts
export const brandsService = createResourceService<Brand, BrandInput>("/api/brands");
export const brandKeys = createResourceKeys("brands");
export const useBrands = (params = {}) => useResourceList(brandKeys, brandsService, params);
```

Do not put database queries in client hooks or UI components. Route handlers call a repository; services call the route handler; hooks call services; feature components call hooks.
