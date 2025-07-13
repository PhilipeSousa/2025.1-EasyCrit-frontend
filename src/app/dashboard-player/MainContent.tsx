import React from 'react'
import styles from './dashboard.module.css'
import Image from 'next/image' // Importar Image

// Componente Box (mantido do seu código anterior, se necessário)
// Assumindo que Box usa classes de dashboard.module.css
const Box = () => {
	// Exemplo de como Box pode usar as classes do módulo CSS
	const campaigns = [
		{ logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
		{ logo: '/images/spider.png', title: 'A FLOREsta RADIOATIVA' },
	]

	return (
		<div className={styles.boxContainer}>
			{' '}
			{/* Classe de dashboard.module.css */}
			{campaigns.map(({ logo, title }, idx) => (
				<div key={idx} className={styles.card}>
					{' '}
					{/* Classe de dashboard.module.css */}
					<div className={styles.cardHeader}>
						{' '}
						{/* Classe de dashboard.module.css */}
						{/* Substituir <img> por <Image /> */}
						<Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
						<span className={styles.cardTitle}>{title}</span> {/* Classe de dashboard.module.css */}
					</div>
					<div className={styles.cardContent}>
						{' '}
						{/* Classe de dashboard.module.css */}
						<div className={styles.cardColumn}>
							{' '}
							{/* Classe de dashboard.module.css */}
							<div className={styles.sectionTitle}>MESTRE</div> {/* Classe de dashboard.module.css */}
							<div className={styles.sectionTitle}>JOGADORES</div> {/* Classe de dashboard.module.css */}
							<div className={styles.playersGrid}>
								{' '}
								{/* Classe de dashboard.module.css */}
								{[1, 2, 3, 4].map((i) => (
									// Substituir <img> por <Image />
									<Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
								))}
							</div>
						</div>
						<div className={styles.cardColumn}>
							{' '}
							{/* Classe de dashboard.module.css */}
							<div className={styles.sectionTitleRight}>MAPA</div> {/* Classe de dashboard.module.css */}
							{/* Substituir <img> por <Image /> */}
							<Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} />{' '}
							{/* Classe de dashboard.module.css */}
							<div className={styles.mapName}>NOME DO MAPA</div> {/* Classe de dashboard.module.css */}
							<div className={styles.sectionTitle}>ESTATISTICAS</div> {/* Classe de dashboard.module.css */}
							<div className={styles.statItem}>
								{' '}
								{/* Classe de dashboard.module.css */}
								{/* Substituir <img> por <Image /> */}
								<Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
								<span>00:00:00</span>
							</div>
							<div className={styles.divider}></div> {/* Classe de dashboard.module.css */}
							<div className={styles.statItem}>
								{' '}
								{/* Classe de dashboard.module.css */}
								{/* Substituir <img> por <Image /> */}
								<Image src='/images/check.png' alt='Check' width={25} height={25} />
								<span>SESSÕES REALIZADAS</span>
							</div>
							<div className={styles.divider}></div> {/* Classe de dashboard.module.css */}
							<div className={styles.statItem}>
								{' '}
								{/* Classe de dashboard.module.css */}
								{/* Substituir <img> por <Image /> */}
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

const MainContent: React.FC = () => {
	return (
		<div className='main-content'>
			<div className={styles.contentWrapper}>
				<div className={styles.boxContainer}>
					<Box />
				</div>
			</div>
		</div>
	)
}

export default MainContent
