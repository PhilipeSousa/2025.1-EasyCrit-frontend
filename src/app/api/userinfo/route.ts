import { NextRequest, NextResponse } from 'next/server'
const AUTH_API = process.env.AUTH_API ?? 'http://auth:8080'

type User = { id: number; username: string; role: 'PLAYER' | 'DUNGEON_MASTER' }

export async function GET(req: NextRequest) {
	const token = req.cookies.get('auth_token')?.value
	if (!token) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 })

	let username: string
	try {
		const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'))
		username = payload.sub
	} catch {
		return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
	}

	const listRes = await fetch(`${AUTH_API}/users`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	if (!listRes.ok) return NextResponse.json({ message: 'Erro ao buscar usuários' }, { status: listRes.status })

	const { users } = (await listRes.json()) as { users: User[] }
	const user = users.find((u) => u.username === username)
	if (!user) return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })

	const userRes = await fetch(`${AUTH_API}/users/${user.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	if (!userRes.ok) return NextResponse.json({ message: 'Erro ao buscar dados do usuário' }, { status: userRes.status })

	const userData = await userRes.json()
	return NextResponse.json({ role: userData.role }, { status: 200 })
}
