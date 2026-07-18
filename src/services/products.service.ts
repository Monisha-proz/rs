import { createResourceService } from "@/lib/resource-service";
import type { ListParams } from "@/types/api";
import type { Product, ProductInput } from "@/types/product";

export const productsService = createResourceService<Product, ProductInput, Partial<ProductInput>, ListParams>("/api/products");
