"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useCreateProduct, useProducts } from "@/hooks/use-products";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Product } from "@/types/product";

const columns: ColumnDef<Product, unknown>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-xs text-stone-500">
          {row.original.sku ?? row.original.slug}
        </p>
      </div>
    ),
  },
  { accessorKey: "vegType", header: "Type" },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) =>
      formatCurrency(row.original.salePrice ?? row.original.basePrice),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => row.original.stock ?? "—",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.isActive ? "text-emerald-700" : "text-stone-500"
        }
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const products = useProducts({ search });
  const createProduct = useCreateProduct();
  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <section>
        <p className="text-sm font-semibold text-[var(--primary-shade-400)]">
          Catalogue
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="mt-1 text-stone-600">
          Manage products, pricing, availability, and inventory-ready variants.
        </p>
      </section>
      <ProductForm
        isPending={createProduct.isPending}
        onSubmit={async (values) => {
          await createProduct.mutateAsync(values);
        }}
      />
      {createProduct.isError && (
        <p className="text-sm text-red-700">{createProduct.error.message}</p>
      )}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Product catalogue</h2>
          <Input
            aria-label="Search products"
            className="max-w-xs"
            placeholder="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {products.isLoading ? (
          <p className="py-8 text-sm text-stone-500">Loading products…</p>
        ) : products.isError ? (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {products.error.message}
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={products.data?.data ?? []}
            emptyMessage="Create your first snack product above."
          />
        )}
      </section>
    </main>
  );
}
