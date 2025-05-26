'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
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
					<h2 className={styles.title}>BEM-VINDO DE VOLTA!</h2>
					<form>
						<div className={styles.inputGroup}>
							<label htmlFor='email'>EMAIL</label>
							<input type='email' id='email' placeholder='Seu email' className={styles.inputField} />
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='senha'>SENHA</label>
							<input type='password' id='senha' placeholder='Sua senha' className={styles.inputField} />
						</div>
						<button type='submit' className={styles.submitButton}>
							LOGIN
						</button>
					</form>
					<div className={styles.registerLink}>
						PRECISA DE UMA CONTA? <Link href='/cadastro'>CADASTRE-SE</Link>
					</div>
				</div>
			</div>
		</>
	)
}
