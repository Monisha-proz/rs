import type { Product, ProductInput } from "@/types/product";

/** Development-only catalogue. Replace this module with a Prisma repository when the commerce schema is migrated. */
export const products: Product[] = [
  { id: "prd-mixture", name: "South Indian Mixture", slug: "south-indian-mixture", shortDescription: "A crunchy blend of sev, peanuts, and lentils.", sku: "RS-MIX-250", vegType: "veg", basePrice: 140, salePrice: 125, isFeatured: true, isActive: true, stock: 48, createdAt: "2026-07-01T09:00:00.000Z" },
  { id: "prd-murukku", name: "Butter Murukku", slug: "butter-murukku", shortDescription: "Crisp, buttery spirals made with rice flour.", sku: "RS-MUR-200", vegType: "veg", basePrice: 120, salePrice: null, isFeatured: true, isActive: true, stock: 32, createdAt: "2026-07-02T09:00:00.000Z" },
  { id: "prd-banana-chips", name: "Nendran Banana Chips", slug: "nendran-banana-chips", shortDescription: "Traditional Kerala-style salted banana chips.", sku: "RS-BNC-150", vegType: "vegan", basePrice: 110, salePrice: 99, isFeatured: false, isActive: true, stock: 18, createdAt: "2026-07-03T09:00:00.000Z" },
  { id: "prd-laddu", name: "Boondi Laddu", slug: "boondi-laddu", shortDescription: "Festive sweet ladoos with roasted cashews.", sku: "RS-LAD-250", vegType: "veg", basePrice: 180, salePrice: null, isFeatured: false, isActive: false, stock: 0, createdAt: "2026-07-04T09:00:00.000Z" },
];

export function createSampleProduct(input: ProductInput): Product {
  const product: Product = { ...input, id: `prd-${crypto.randomUUID()}`, stock: 0, createdAt: new Date().toISOString() };
  products.unshift(product);
  return product;
}
