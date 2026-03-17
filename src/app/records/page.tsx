import { createSupabaseServerClient } from '@/lib/supabase/server';
import Image from 'next/image';

export default async function RecordsPage() {
  const supabase = await createSupabaseServerClient();  

  // Fetch featured release
  const { data: featuredRelease, error: featuredError } = await supabase
    .from('releases')
    .select('*')
    .eq('is_featured', true)
    .order('release_date', { ascending: false })
    .limit(1)
    .single();

  // Fetch all releases
  const { data: releases, error: releasesError } = await supabase
    .from('releases')
    .select('*')
    .order('release_date', { ascending: false });


  // Debug output – keep until data appears, then remove
  if (releasesError || featuredError) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl text-red-400 mb-8">Fetch Error</h1>
        <pre className="bg-zinc-900 p-6 rounded text-sm overflow-auto">
          {JSON.stringify({ releasesError, featuredError }, null, 2)}
        </pre>
        <p className="mt-4 text-zinc-400">
          If RLS: Run in SQL Editor:
          <br />
          <code>CREATE POLICY &quot;Public read releases&quot; ON releases FOR SELECT USING (true);</code>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Hero */}
      {featuredRelease && (
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {featuredRelease.artwork_url ? (
              <Image
                src={featuredRelease.artwork_url}
                alt={featuredRelease.title}
                fill
                className="object-cover brightness-50"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-950 to-black" />
            )}
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-violet-400 mb-4 tracking-tight">
              {featuredRelease.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8">
              {featuredRelease.description}
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold text-lg transition">
                Stream Now
              </button>
              {featuredRelease.is_vault_exclusive && (
                <button className="px-8 py-4 border border-violet-500 hover:bg-violet-950/50 rounded-lg font-semibold text-lg transition">
                  Unlock Vault
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Releases Grid */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-violet-500 mb-12 text-center">The Catalog</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {releases?.map((release) => (
            <div
              key={release.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-violet-600 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
            >
              <div className="relative aspect-square">
                {release.artwork_url ? (
                  <Image
                    src={release.artwork_url}
                    alt={release.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-950/50 to-black flex items-center justify-center">
                    <span className="text-zinc-600 text-xl">No Cover</span>
                  </div>
                )}

                {release.is_vault_exclusive && (
                  <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full text-xs font-medium border border-violet-500/50">
                    Vault Exclusive
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-sm text-zinc-400 mb-3">
                  {release.type.toUpperCase()} • {release.release_date || 'TBA'}
                </p>
                <p className="text-zinc-300 text-sm line-clamp-3">
                  {release.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!releases?.length && (
          <p className="text-center text-zinc-500 py-20">No releases yet — empire loading...</p>
        )}
      </section>
    </div>
  );
}
