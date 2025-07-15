'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
	return (
		<div className={styles.page}>
			{/* HEADER — botões à direita */}
			<header className={styles.header}>
				<nav>
					<Link href='/login' className={`${styles.btn} ${styles.primary}`}>
						Entrar
					</Link>
					<Link href='/register' className={`${styles.btn} ${styles.secondary}`}>
						Criar conta
					</Link>
				</nav>
			</header>

			{/* CONTEÚDO CENTRAL */}
			<main className={styles.main}>
				<Image
					src='/images/logo-easycrit-rounded.png'
					alt='Logo EasyCrit'
					width={200}
					height={200}
					priority
					className={styles.logo}
				/>

				<p className={styles.tagline}>
					Uma ferramenta divertida, intuitiva e poderosa
					<br />
					para mestres e jogadores de RPG de mesa.
				</p>
			</main>
		</div>
	)
}
