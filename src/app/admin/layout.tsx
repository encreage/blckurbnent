// app/admin/layout.tsx
import { Sidebar } from '@/app/components/Sidebar'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                  Admin
                </p>
                <h1 className="mt-1 text-lg font-semibold text-white">
                  BLACK URBAN Dashboard
                </h1>
              </div>
              <p className="text-sm text-zinc-400">
                {user?.email ?? "Authenticated user"}
              </p>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
