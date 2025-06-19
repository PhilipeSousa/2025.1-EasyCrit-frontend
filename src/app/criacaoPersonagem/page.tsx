'use client'

import { useState } from 'react'
import styles from './criacaoPersonagem.module.css'
import Image from 'next/image'

export default function CriacaoPersonagem() {
	const [nome, setNome] = useState('')
	const [classe, setBibliografia] = useState('')
	const [raca, setPreview] = useState('')
	const [mensagem, setMensagem] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setMensagem(`Personagem ${nome} criado com sucesso!`)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.titulo}>Seu Personagem</h1>

			<form onSubmit={handleSubmit} className={styles.formulario}>
				<div className={styles.grupoInput}>
					<label>Nome do Personagem</label>
					<input
						type='text'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder='Digite o nome do personagem'
					/>
				</div>

				<div className={styles.grupoInput}>
					<label>Bibliografia:</label>
					<input
						type='text'
						value={classe}
						onChange={(e) => setBibliografia(e.target.value)}
						placeholder='Digite a bibliografia'
					/>
				</div>

				<div className={styles.grupoInput}>
					<label>Preview da Ficha:</label>
					<input type='text' value={raca} onChange={(e) => setPreview(e.target.value)} placeholder='Digite a preview' />
				</div>

				<div className={styles.grupoImagem}>
					<label>Imagem:</label>
					<Image src='/images/mclovin.png' alt='Imagem do personagem' width={120} height={120} />
				</div>
				<div className={styles.logoContainer}>
					<Image src='/images/logo-easycrit-rounded.png' alt='Logo EasyCrit' width={100} height={100} />
				</div>

				<button type='submit' className={styles.botaoCriar}>
					confirmar
				</button>

				<button type='submit' className={styles.botaoCriar}>
					Excluir
				</button>
			</form>

			{mensagem && <p className={styles.mensagem}>{mensagem}</p>}
		</div>
	)
}
