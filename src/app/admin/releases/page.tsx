// app/admin/releases/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Image from 'next/image'

export default async function ReleasesPage() {
  const supabase = await createSupabaseServerClient()
  const { data: releases, error } = await supabase
    .from('releases')
    .select('*')
    .order('release_date', { ascending: false })

  if (error) return <div>Error loading releases</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-violet-400">Releases</h1>
        <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">
          New Release
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {releases?.map(release => (
          <div key={release.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-violet-600 transition-colors">
            <div className="relative mb-4 aspect-square overflow-hidden rounded">
              <Image
                src={release.artwork_url || '/placeholder.jpg'}
                alt={release.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="font-semibold">{release.title}</h3>
            <p className="text-sm text-zinc-400">{release.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
