// lib/supabase/middleware.ts  ← rename to middleware.ts in root if you prefer
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          response.cookies.delete({ name, ...options })
        },
      },
    }
  )

  // Refresh session (important for SSR)
  await supabase.auth.getUser()

  // Protect /admin/* routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Optional: role check later (e.g. user email ends with @blackurban.com)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    // add more protected groups if needed
  ],
}
