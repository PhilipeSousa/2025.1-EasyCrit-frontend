import { NextRequest, NextResponse } from 'next/server'

const AUTH_API = process.env.AUTH_API ?? 'http://auth:8080'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const authRes = await fetch(`${AUTH_API}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		const data = await authRes.json()
		if (!authRes.ok) return NextResponse.json(data, { status: authRes.status })

		const res = NextResponse.json({ ok: true })
		res.cookies.set({
			name: 'auth_token',
			value: data.access_token,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
		})
		return res
	} catch {
		return NextResponse.json({ detail: 'Erro interno no proxy.' }, { status: 500 })
	}
}
