import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-zinc-500">
            BLACK URBAN
          </p>

          <h1 className="text-5xl font-black uppercase tracking-[-0.06em] text-white sm:text-7xl md:text-8xl">
            Umbrella for Bold Urban Culture
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            BLACK URBAN is the parent brand. BLACK URBAN RECORDS is the first active
            endpoint.
          </p>

          <div className="mt-12 flex justify-center">
            <Link
              href="/records"
              className="border border-zinc-700 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Enter Records
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
