export type VegType = "veg" | "nonveg" | "vegan" | "na";

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  sku?: string | null;
  vegType: VegType;
  basePrice: number;
  salePrice?: number | null;
  isFeatured: boolean;
  isActive: boolean;
  imageUrl?: string | null;
  stock?: number;
  createdAt: string;
};

export type ProductInput = Pick<Product, "name" | "slug" | "shortDescription" | "sku" | "vegType" | "basePrice" | "salePrice" | "isFeatured" | "isActive">;
