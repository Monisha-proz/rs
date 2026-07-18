import { NextResponse } from "next/server";
import { createSampleProduct, products } from "@/mocks/products";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { Product, ProductInput } from "@/types/product";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize")) || 10));
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const filtered = search ? products.filter(product => `${product.name} ${product.sku} ${product.slug}`.toLowerCase().includes(search)) : products;
  const data: PaginatedResponse<Product> = { data: filtered.slice((page - 1) * pageSize, page * pageSize), meta: { page, pageSize, total: filtered.length, pageCount: Math.max(1, Math.ceil(filtered.length / pageSize)) } };
  return NextResponse.json<ApiResponse<PaginatedResponse<Product>>>({ data });
}

export async function POST(request: Request) {
  const input = (await request.json()) as ProductInput;
  if (!input.name || !input.slug) return NextResponse.json({ message: "Name and slug are required." }, { status: 400 });
  if (products.some(product => product.slug === input.slug)) return NextResponse.json({ message: "A product with this slug already exists." }, { status: 409 });
  return NextResponse.json<ApiResponse<Product>>({ data: createSampleProduct(input), message: "Sample product created." }, { status: 201 });
}
