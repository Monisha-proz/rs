"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ProductInput } from "@/types/product";

const productSchema = z.object({
  name: z.string().min(2, "Enter at least 2 characters."),
  slug: z.string().min(2, "A slug is required.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  shortDescription: z.string().max(500).optional(),
  sku: z.string().max(100).optional(),
  vegType: z.enum(["veg", "nonveg", "vegan", "na"]),
  basePrice: z.number().min(0, "Price cannot be negative."),
  salePrice: z.number().min(0).nullable(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

const defaultValues: ProductInput = { name: "", slug: "", shortDescription: "", sku: "", vegType: "na", basePrice: 0, salePrice: null, isFeatured: false, isActive: true };

export function ProductForm({ onSubmit, isPending = false }: { onSubmit: (values: ProductInput) => Promise<unknown> | void; isPending?: boolean }) {
  const form = useForm({ defaultValues, validators: { onSubmit: productSchema }, onSubmit: async ({ value }) => { await onSubmit(value); } });
  const textField = (name: "name" | "slug" | "sku" | "shortDescription" | "basePrice" | "salePrice", label: string, type: "text" | "number" = "text") => <form.Field name={name}>{field => <label className="grid gap-1 text-sm font-medium">{label}<Input type={type} value={field.state.value ?? ""} onBlur={field.handleBlur} onChange={event => field.handleChange(type === "number" ? Number(event.target.value) : event.target.value)} />{field.state.meta.errors.length > 0 && <span className="text-xs text-red-600">{String(field.state.meta.errors[0])}</span>}</label>}</form.Field>;
  return <form className="grid gap-4 rounded-xl border border-stone-200 bg-white p-5 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
    {textField("name", "Product name")}
    {textField("slug", "Slug")}
    {textField("sku", "SKU")}
    <form.Field name="vegType">{field => <label className="grid gap-1 text-sm font-medium">Food type<select className="rounded-lg border border-stone-300 px-3 py-2" value={field.state.value} onChange={event => field.handleChange(event.target.value as ProductInput["vegType"])}><option value="na">Not specified</option><option value="veg">Vegetarian</option><option value="vegan">Vegan</option><option value="nonveg">Non-vegetarian</option></select></label>}</form.Field>
    {textField("basePrice", "Base price", "number")}
    {textField("salePrice", "Sale price", "number")}
    {textField("shortDescription", "Short description")}
    <div className="flex items-end gap-5 pb-2 text-sm"><form.Field name="isFeatured">{field => <label className="flex items-center gap-2"><input checked={field.state.value} onChange={event => field.handleChange(event.target.checked)} type="checkbox" /> Featured</label>}</form.Field><form.Field name="isActive">{field => <label className="flex items-center gap-2"><input checked={field.state.value} onChange={event => field.handleChange(event.target.checked)} type="checkbox" /> Active</label>}</form.Field></div>
    <div className="md:col-span-2"><form.Subscribe selector={state => [state.canSubmit, state.isSubmitting] as const}>{([canSubmit, isSubmitting]) => <Button disabled={!canSubmit || isSubmitting || isPending} type="submit">{isSubmitting || isPending ? "Saving..." : "Create product"}</Button>}</form.Subscribe></div>
  </form>;
}
