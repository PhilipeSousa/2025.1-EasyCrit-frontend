'use client'

import styles from './dashboard.module.css'
import Image from 'next/image'
import React from 'react'

const campaigns = [
	{ logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
	{ logo: '/images/spider.png', title: 'A FLORESTA RADIOATIVA' },
]

const Box = () => {
	return (
		<div className={styles.boxContainer}>
			{campaigns.map(({ logo, title }, idx) => (
				<div key={idx} className={styles.card}>
					<div className={styles.cardHeader}>
						<Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
						<span className={styles.cardTitle}>{title}</span>
					</div>

					<div className={styles.cardContent}>
						<div className={styles.cardColumn}>
							<div className={styles.sectionTitle}>MESTRE</div>
							<div className={styles.sectionTitle}>JOGADORES</div>
							<div className={styles.playersGrid}>
								{[1, 2, 3, 4].map((i) => (
									<Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
								))}
							</div>
						</div>

						<div className={styles.cardColumn}>
							<div className={styles.sectionTitleRight}>MAPA</div>
							<Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} />
							<div className={styles.mapName}>NOME DO MAPA</div>
							<div className={styles.sectionTitle}>ESTATISTICAS</div>

							<div className={styles.statItem}>
								<Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
								<span>00:00:00</span>
							</div>
							<div className={styles.divider}></div>
							<div className={styles.statItem}>
								<Image src='/images/check.png' alt='Check' width={25} height={25} />
								<span>SESSÕES REALIZADAS</span>
							</div>
							<div className={styles.divider}></div>
							<div className={styles.statItem}>
								<Image src='/images/calendar.png' alt='Calendário' width={25} height={25} />
								<span>00/00/0000</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default function Dashboard() {
	return (
		<>
			<header className={styles.topBar}>
				<div className={styles.topBarLogo}>
					<Image src='/images/Light-icon.png' alt='Logo Dashboard' width={70} height={70} />
				</div>
				<h1>DASHBOARD DO MESTRE</h1>
				<button className={styles.logoutButton}>LOGOUT</button>
			</header>

			<div className={styles.container}>
				<aside className={styles.sidebar}>
					<div className={styles.logoContainer}>
						<Image src='/images/logo1.png' alt='EasyCrit Logo' width={180} height={180} className={styles.logo} />
					</div>
				</aside>

				<main className={styles.mainContent}>
					<div className={styles.contentWrapper}>
						<div className={styles.sessionActions}>
							<button className={styles.sessionButton}>CRIAR CAMPANHA</button>
							<button className={`${styles.sessionButton} ${styles.deleteButton}`}>EXCLUIR CAMPANHA</button>
						</div>

						<div className={styles.boxContainer}>
							<Box />
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
