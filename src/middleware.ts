import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('auth_token')?.value

	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	try {
		return NextResponse.next()
	} catch {
		return NextResponse.redirect(new URL('/login', req.url))
	}
}

export const config = {
	matcher: [
		'/dashboard-player',
		'/dashboard-player/:path*',
		'/dashboard-master',
		'/dashboard-master/:path*',
		'/dashboard/:path*',
		'/create-campaign',
		'/create-character',
	],
}
