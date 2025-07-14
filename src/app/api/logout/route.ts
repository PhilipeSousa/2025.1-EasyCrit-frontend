import { NextResponse } from 'next/server'

export async function POST() {
	const response = NextResponse.json({ message: 'Logout realizado' })

	response.cookies.set({
		name: 'auth_token',
		value: '',
		path: '/',
		httpOnly: true,
		expires: new Date(0),
	})

	return response
}
