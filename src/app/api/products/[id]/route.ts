import { NextResponse } from "next/server";
import { products } from "@/mocks/products";
import type { ApiResponse } from "@/types/api";
import type { Product, ProductInput } from "@/types/product";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const product = products.find(item => item.id === id);
  if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 });
  const input = (await request.json()) as Partial<ProductInput>;
  Object.assign(product, input);
  return NextResponse.json<ApiResponse<Product>>({ data: product, message: "Sample product updated." });
}
