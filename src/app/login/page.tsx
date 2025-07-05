'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [mensagem, setMensagem] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const res = await fetch('http://localhost:4000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, senha }),
			})

			const data = await res.json()

			if (res.ok) {
				setMensagem(`Login bem-sucedido! Bem-vindo, ${data.user}.`)
			} else {
				setMensagem(data.error)
			}
		} catch {
			setMensagem('Erro de conexão com o servidor.')
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
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								placeholder='Seu email'
								className={styles.inputField}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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