'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [senha, setSenha] = useState('')
	const [mensagem, setMensagem] = useState('')
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setMensagem('')

		try {
			const loginRes = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password: senha }),
			})

			const loginData = await loginRes.json()

			if (!loginRes.ok) {
				setMensagem(loginData.detail || 'Erro no login.')
				return
			}

			const token = loginData.access_token

			localStorage.setItem('token', token)

			const userRes = await fetch('/api/userinfo', {
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			})

			const userInfo = await userRes.json()

			if (!userRes.ok || !userInfo.role) {
				setMensagem('Não foi possível recuperar o role do usuário.')
				return
			}

			const role = userInfo.role.toUpperCase()

			if (role === 'DUNGEON_MASTER') {
				router.push('/dashboard-master')
			} else if (role === 'PLAYER') {
				router.push('/dashboard-player')
			} else {
				setMensagem('Função do usuário desconhecida.')
			}
		} catch {
			setMensagem('Erro ao conectar com o servidor.')
		}
	}

	return (
		<>
			<div className={styles.navbar}>
				<div className={styles.navLeft}>
					<Image src='/images/logo-easycrit-rounded.png' alt='EasyCrit Logo' width={45} height={45} priority />
					<span className={styles.siteName}>EasyCrit</span>
				</div>
				<div className={styles.navRight}>
					<Image src='/images/user-circle.png' alt='User Icon' width={30} height={30} />
				</div>
			</div>

			<div className={styles.mainContainer}>
				<div className={styles.loginBox}>
					<h2 className={styles.title}>Bem-vindo de volta!</h2>

					<form onSubmit={handleSubmit}>
						<div className={styles.inputGroup}>
							<label htmlFor='username'>Usuário</label>
							<input
								type='text'
								id='username'
								placeholder='Seu usuário'
								className={styles.inputField}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='senha'>Senha</label>
							<input
								type='password'
								id='senha'
								placeholder='Sua senha'
								className={styles.inputField}
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								required
							/>
						</div>

						<button type='submit' className={styles.submitButton}>
							Login
						</button>
					</form>

					{mensagem && <p className={styles.mensagem}>{mensagem}</p>}

					<div className={styles.registerLink}>
						<span className='registerText'>Precisa de uma conta?</span> <Link href='/register'>Cadastre-se</Link>
					</div>
				</div>
			</div>
		</>
	)
}
