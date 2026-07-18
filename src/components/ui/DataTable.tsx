"use client";

import { flexRender, getCoreRowModel, getPaginationRowModel, type ColumnDef, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

type Props<T> = { columns: ColumnDef<T, unknown>[]; data: T[]; emptyMessage?: string };

export function DataTable<T>({ columns, data, emptyMessage }: Props<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 10 } } });
  if (!data.length) return <EmptyState description={emptyMessage} />;
  return <div className="overflow-hidden rounded-xl border border-stone-200 bg-white"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-stone-600">{table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>{headerGroup.headers.map(header => <th className="px-4 py-3 font-medium" key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row => <tr className="border-t border-stone-100" key={row.id}>{row.getVisibleCells().map(cell => <td className="px-4 py-3" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table></div><div className="flex items-center justify-between border-t border-stone-100 px-4 py-3 text-sm"><span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span><div className="flex gap-2"><Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button><Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button></div></div></div>;
}
