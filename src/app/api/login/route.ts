import { NextRequest, NextResponse } from 'next/server'

const AUTH_API = 'http://auth:8080'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const backendRes = await fetch(`${AUTH_API}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
		const data = await backendRes.json()
		return new NextResponse(JSON.stringify(data), {
			status: backendRes.status,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch {
		return new NextResponse(JSON.stringify({ detail: 'Erro interno no proxy.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
