"use client";

import { createResourceKeys, useCreateResource, useResourceList, useUpdateResource } from "@/hooks/use-resource";
import { productsService } from "@/services/products.service";
import type { ListParams } from "@/types/api";
import type { Product, ProductInput } from "@/types/product";

export const productKeys = createResourceKeys("products");

export function useProducts(params: ListParams = {}) {
  return useResourceList<Product, ProductInput, Partial<ProductInput>, ListParams>(productKeys, productsService, params);
}

export function useCreateProduct() {
  return useCreateResource<Product, ProductInput, Partial<ProductInput>, ListParams>(productKeys, productsService);
}

export function useUpdateProduct() {
  return useUpdateResource<Product, ProductInput, Partial<ProductInput>, ListParams>(productKeys, productsService);
}
