import { NextRequest, NextResponse } from 'next/server'
const AUTH_API = process.env.AUTH_API ?? 'http://auth:8080'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const res = await fetch(`${AUTH_API}/users/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		const data = await res.json()
		return NextResponse.json(data, { status: res.status })
	} catch {
		return NextResponse.json({ detail: 'Erro interno no proxy.' }, { status: 500 })
	}
}
