import React from 'react'
import './MainContent.css'
import './CustomScrollbar.css'

const MainContent: React.FC = () => {
	return (
		<div className='main-content'>
			<div className='content-card'>
				<div className='cards-container'>
					{/* FIRST CARD */}
					<div className='inner-card'>
						<div className='card-header'>
							<img src='images/rocket.png' alt='Ícone de foguete' className='header-icon' />
							<h3 className='header-title'>Uma Odisseia no Espaço</h3>
						</div>

						<div className='dashboard-card-content'>
							<div className='user-section'>
								<h4>Mestre</h4>
								<img src='images/circle.png' alt='Mestre' className='user-avatar' />

								<h4>Jogadores</h4>
								<div className='players'>
									<img src='images/circle.png' alt='Jogador 1' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 2' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 3' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 4' className='user-avatar' />
								</div>
							</div>

							<div className='divider' />

							<div className='info-section'>
								<div className='map-info'>
									<img src='images/image.png' alt='Mapa' className='map-icon' />
									<span className='map-name'>Andromeda</span>
								</div>

								<div className='stats'>
									<div className='stat-item'>
										<span className='stat-icon'>🕒</span>
										<span>1:54:45</span>
									</div>
									<div className='stat-item'>
										<span className='stat-icon'>📘</span>
										<span>3 sessões realizadas</span>
									</div>
									<div className='stat-item'>
										<span className='stat-icon'>👥</span>
										<span>2 usuários conectados</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* SECOND CARD */}
					<div className='inner-card'>
						<div className='card-header'>
							<img src='images/spider.png' alt='Ícone de aranha' className='header-icon' />
							<h3 className='header-title'>Exploração Galáctica</h3>
						</div>

						<div className='dashboard-card-content'>
							<div className='user-section'>
								<h4>Mestre</h4>
								<img src='images/circle.png' alt='Mestre' className='user-avatar' />

								<h4>Jogadores</h4>
								<div className='players'>
									<img src='images/circle.png' alt='Jogador 1' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 2' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 3' className='user-avatar' />
									<img src='images/circle.png' alt='Jogador 4' className='user-avatar' />
								</div>
							</div>

							<div className='divider' />

							<div className='info-section'>
								<div className='map-info'>
									<img src='images/image.png' alt='Mapa' className='map-icon' />
									<span className='map-name'>Nebulosa X</span>
								</div>

								<div className='stats'>
									<div className='stat-item'>
										<span className='stat-icon'>🕒</span>
										<span>2:36:10</span>
									</div>
									<div className='stat-item'>
										<span className='stat-icon'>📘</span>
										<span>5 sessões realizadas</span>
									</div>
									<div className='stat-item'>
										<span className='stat-icon'>👥</span>
										<span>4 usuários conectados</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainContent
