import { NextRequest, NextResponse } from 'next/server'

const AUTH_API = 'http://auth:8080'

type User = {
	id: number
	username: string
	email: string
	role: 'PLAYER' | 'DUNGEON_MASTER'
}

export async function GET(req: NextRequest) {
	const auth = req.headers.get('authorization')
	if (!auth?.startsWith('Bearer ')) {
		return NextResponse.json({ message: 'Token não fornecido' }, { status: 401 })
	}

	const token = auth.replace('Bearer ', '')
	let username: string | null = null

	try {
		const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'))
		username = payload?.sub
	} catch {
		return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
	}

	if (!username) {
		return NextResponse.json({ message: 'Username não encontrado no token' }, { status: 401 })
	}

	const listRes = await fetch(`${AUTH_API}/users`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	if (!listRes.ok) {
		return NextResponse.json({ message: 'Erro ao buscar usuários' }, { status: listRes.status })
	}

	const listData = await listRes.json()

	const users: User[] = listData.users
	const user = users.find((u) => u.username === username)

	if (!user) {
		return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })
	}

	const userRes = await fetch(`${AUTH_API}/users/${user.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	if (!userRes.ok) {
		return NextResponse.json({ message: 'Erro ao buscar dados do usuário' }, { status: userRes.status })
	}

	const userData = await userRes.json()

	return NextResponse.json({ role: userData.role }, { status: 200 })
}
