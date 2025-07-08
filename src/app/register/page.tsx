'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './register.module.css'
import Image from 'next/image'

export default function RegisterPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [username, setUsername] = useState('')

	const [role, setRole] = useState<'DUNGEON_MASTER' | 'PLAYER'>('DUNGEON_MASTER')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setError('')
		setLoading(true)

		if (password !== confirmPassword) {
			setError('As senhas não coincidem.')
			setLoading(false)
			return
		}

		const roleToSend = role === 'DUNGEON_MASTER' ? 'dungeon master' : 'player'

		try {
			const response = await fetch('http://localhost:8080/users/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password,
					username,
					role: roleToSend,
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				if (Array.isArray(errorData.detail)) {
					const messages = (errorData.detail as { msg: string }[]).map((e) => e.msg).join('; ')
					setError(messages)
				} else {
					setError(errorData.detail || 'Erro ao cadastrar usuário.')
				}
			} else {
				localStorage.setItem('role', role)
				router.push('/login')
			}
		} catch (err) {
			let errorMessage = 'Ocorreu um erro desconhecido ao tentar conectar com o servidor.'
			if (err instanceof Error) errorMessage = `Erro: ${err.message}`
			else if (typeof err === 'string') errorMessage = `Erro: ${err}`
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.pageContainer}>
			<header className={styles.header}>
				<h1 className={styles.headerTitle}>EASYCRIT</h1>
			</header>
			<div className={styles.mainContainer}>
				<div className={styles.blackContainer}>
					<div className={styles.formWrapper}>
						<h2 className={styles.greeting}>Crie sua conta</h2>
						<form onSubmit={handleSubmit}>
							<div className={styles.inputGroup}>
								<label htmlFor='username'>Nome de Usuário</label>
								<input
									type='text'
									id='username'
									className={styles.inputField}
									placeholder='Seu nome de usuário'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className={styles.inputGroup}>
								<label htmlFor='email'>Email</label>
								<input
									type='email'
									id='email'
									className={styles.inputField}
									placeholder='Seu email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className={styles.inputGroup}>
								<label htmlFor='password'>Senha</label>
								<input
									type='password'
									id='password'
									className={styles.inputField}
									placeholder='••••••••'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className={styles.inputGroup}>
								<label htmlFor='confirm-password'>Confirmar Senha</label>
								<input
									type='password'
									id='confirm-password'
									className={styles.inputField}
									placeholder='••••••••'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>

							<div className={styles.adventureChoice}>
								<div className={styles.chooseAdventure}>Escolha sua aventura</div>
								<div className={styles.roles}>
									<label className={styles.roleOption}>
										<input
											type='radio'
											name='role'
											value='DUNGEON_MASTER'
											className={styles.radioInput}
											checked={role === 'DUNGEON_MASTER'}
											onChange={() => setRole('DUNGEON_MASTER')}
										/>
										<Image
											src='/mestre-icon.svg'
											alt='Dungeon Master'
											width={40}
											height={40}
											className={styles.roleImage}
										/>
										<span className={styles.roleLabel}>Mestre</span>
									</label>
									<label className={styles.roleOption}>
										<input
											type='radio'
											name='role'
											value='PLAYER'
											className={styles.radioInput}
											checked={role === 'PLAYER'}
											onChange={() => setRole('PLAYER')}
										/>
										<Image src='/jogador-icon.svg' alt='Player' width={40} height={40} className={styles.roleImage} />
										<span className={styles.roleLabel}>Jogador</span>
									</label>
								</div>
							</div>

							{error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

							<button type='submit' className={styles.submitButton} disabled={loading}>
								{loading ? 'CADASTRANDO...' : 'CADASTRAR-SE'}
							</button>

							<p className={styles.AccountNew}>
								<Link href='/login'>Já tem uma conta?</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
