'use client'

import { useState } from 'react'
import styles from './criacaoPersonagem.module.css'
import Image from 'next/image'

export default function CriacaoPersonagem() {
	const [nome, setNome] = useState('')
	const [classe, setClasse] = useState('')
	const [preview, setPreview] = useState('')
	const [mensagem, setMensagem] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setMensagem(`Personagem ${nome} criado com sucesso!`)
	}

	const handleReset = () => {
		setNome('')
		setClasse('')
		setPreview('')
		setMensagem('')
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<Image src='/images/logo-easycrit-rounded.png' alt='Logo EasyCrit' width={120} height={120} />
			</div>

			<div className={styles.content}>
				<div className={styles.topbar}>
					<div className={styles.starTitle}>
						<Image src='/images/star.png' alt='Star' width={24} height={24} />
						<h1 className={styles.titulo}>Seu Personagem</h1>
					</div>
					<div className={styles.user}>
						<button className={styles.logout}>Logout</button>
						<Image src='/images/mclovin.png' alt='User' width={40} height={40} className={styles.avatar} />
					</div>
				</div>

				<form onSubmit={handleSubmit} className={styles.formulario}>
					<h2 className={styles.subtitulo}>Crie seu Personagem</h2>

					<div className={styles.grupoInputs}>
						<div className={styles.inputArea}>
							<label>Nome do Personagem</label>
							<input type='text' value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite o nome' />

							<label>Bibliografia</label>
							<textarea
								value={classe}
								onChange={(e) => setClasse(e.target.value)}
								placeholder='Digite a bibliografia'
								className={styles.textareaBibliografia}></textarea>

							<div className={styles.colors}>
								<div className={`${styles.color} ${styles.black}`}></div>
								<div className={`${styles.color} ${styles.green}`}></div>
								<div className={`${styles.color} ${styles.yellow}`}></div>
								<div className={`${styles.color} ${styles.orange}`}></div>
								<div className={`${styles.color} ${styles.red}`}></div>
								<div className={`${styles.color} ${styles.pink}`}></div>
							</div>
						</div>

						<div className={styles.previewArea}>
							<label>Preview da Ficha</label>
							<div className={styles.previewInput}>
								<input
									type='text'
									value={preview}
									onChange={(e) => setPreview(e.target.value)}
									placeholder='Digite a preview'
								/>
								<Image src='/images/identification.png' alt='Identificação' width={20} height={20} />
							</div>

							<div className={styles.imagePlaceholder}>
								<Image src='/images/identification.png' alt='Preview' width={50} height={50} />

								<Image
									src='/images/lixeira.png'
									alt='Excluir'
									width={24}
									height={24}
									onClick={handleReset}
									className={styles.iconClickable}
								/>

								<Image src='/images/heroicon.png' alt='Upload' width={24} height={24} className={styles.uploadIcon} />
							</div>
						</div>
					</div>

					<div className={styles.buttons}>
						<button type='button' className={styles.cancelar} onClick={handleReset}>
							Cancelar
						</button>
						<button type='submit' className={styles.confirmar}>
							Confirmar
						</button>
					</div>
				</form>

				{mensagem && <p className={styles.mensagem}>{mensagem}</p>}
			</div>
		</div>
	)
}
