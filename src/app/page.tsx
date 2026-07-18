import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-8">
      <p className="text-sm font-semibold text-[var(--primary-shade-400)]">Rithu Snacks</p>
      <h1 className="mt-2 text-4xl font-bold">Commerce frontend foundation</h1>
      <p className="mt-4 max-w-2xl text-stone-600">A modular Next.js setup for catalogue, customer, cart, order, and administration workflows.</p>
      <Link className="mt-7 w-fit rounded-lg bg-[var(--secondary-base)] px-4 py-2 font-semibold text-white" href="/admin/products">Open product management</Link>
    </main>
  );
}
