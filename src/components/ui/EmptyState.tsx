export function EmptyState({ title = "Nothing here yet", description }: { title?: string; description?: string }) {
  return <div className="rounded-xl border border-dashed border-stone-300 p-10 text-center"><p className="font-medium">{title}</p>{description && <p className="mt-1 text-sm text-stone-500">{description}</p>}</div>;
}
