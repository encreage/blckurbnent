// Very minimal version - expand later
export function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen p-4">
      <div className="text-2xl font-bold text-violet-500 mb-10">Black Urban</div>
      <nav className="space-y-2">
        <a href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-violet-950/50">Dashboard</a>
        <a href="/admin/artists" className="block px-4 py-2 rounded hover:bg-violet-950/50">Artists</a>
        <a href="/admin/releases" className="block px-4 py-2 rounded hover:bg-violet-950/50">Releases</a>
        <a href="/admin/vault" className="block px-4 py-2 rounded hover:bg-violet-950/50">Vault</a>
      </nav>
    </aside>
  )
}