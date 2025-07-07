'use client'

import { useState } from 'react'
import styles from './create-character.module.css'
import Image from 'next/image'

export default function CreateCharacter() {
	const [nome, setNome] = useState('')
	const [classe, setClasse] = useState('')
	const [preview, setPreview] = useState('')
	const [mensagem, setMensagem] = useState('')

	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const newErrors: Record<string, string> = {}

		if (!nome.trim()) newErrors.nome = 'Campo obrigatório'
		if (!classe.trim()) newErrors.classe = 'Campo obrigatório'
		if (!nome.trim()) newErrors.nome = 'Campo obrigatório'

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			alert(`Personagem ${nome}enviado com sucesso!`)
			setMensagem(`Personagem ${nome} criado com sucesso!`)
		}
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
						<Image src='/star.svg' alt='Star icon' width={28} height={28} />
						<h1 className={styles.titulo}>Seu Personagem</h1>
					</div>
					<div className={styles.user}>
						<div className={styles.helloUser}>Olá, Nome do Usuário</div>
						<button className={styles.logout}>Logout</button>

						{/*
						<Image src='/images/mclovin.png' alt='User' width={40} height={40} className={styles.avatar} />						
						*/}
					</div>
				</div>

				<form onSubmit={handleSubmit} className={styles.formulario}>
					<h2 className={styles.subtitulo}>Crie seu Personagem</h2>

					<div className={styles.grupoInputs}>
						<div className={styles.inputArea}>
							<label htmlFor='nameCharacter'>Nome do personagem</label>
							<input
								type='text'
								id='nameCharacter'
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								placeholder='Digite o nome'
								maxLength='50'
							/>
							{errors.nome && <p className={styles.errorMsg}>{errors.nome}</p>}

							<label htmlFor='biography'>Biografia</label>
							<textarea
								value={classe}
								id='biography'
								onChange={(e) => setClasse(e.target.value)}
								placeholder='Digite a biografia do seu personagem'
								className={styles.textAreaBiografia}
								maxLength='250'></textarea>
							{errors.classe && <p className={styles.errorMsg}>{errors.classe}</p>}

							<p className={styles.colorText}>Escolha sua cor:</p>
							<div className={styles.colors}>
								<input
									type='radio'
									name='color'
									id='black'
									value='black'
									className={styles.color}
									hidden
									defaultChecked
								/>
								<label htmlFor='black' className={`${styles.buttonColors} ${styles.black} `}></label>

								<input type='radio' name='color' id='green' value='green' className={styles.color} hidden />
								<label htmlFor='green' className={`${styles.buttonColors} ${styles.green} `}></label>

								<input type='radio' name='color' id='yellow' value='yellow' className={styles.color} hidden />
								<label htmlFor='yellow' className={`${styles.buttonColors} ${styles.yellow} `}></label>

								<input type='radio' name='color' id='orange' value='orange' className={styles.color} hidden />
								<label htmlFor='orange' className={`${styles.buttonColors} ${styles.orange} `}></label>

								<input type='radio' name='color' id='red' value='red' className={styles.color} hidden />
								<label htmlFor='red' className={`${styles.buttonColors} ${styles.red} `}></label>

								<input type='radio' name='color' id='pink' value='pink' className={styles.color} hidden />
								<label htmlFor='pink' className={`${styles.buttonColors} ${styles.pink} `}></label>

								{/*
								Mudei para inputs a seleção de cor do personagem com inputs
								<div className={`${styles.color} ${styles.black}`}></div>
								<div className={`${styles.color} ${styles.green}`}></div>
								<div className={`${styles.color} ${styles.yellow}`}></div>
								<div className={`${styles.color} ${styles.orange}`}></div>
								<div className={`${styles.color} ${styles.red}`}></div>
								<div className={`${styles.color} ${styles.pink}`}></div>
								*/}
							</div>
						</div>

						<div className={styles.previewArea}>
							<label>Preview da ficha</label>
							{/* 
							<div className={styles.previewInput}>
								<input
									type='text'
									value={preview}
									onChange={(e) => setPreview(e.target.value)}
									placeholder='Digite a preview'
								/>
							</div>
							*/}

							<div className={styles.imagePlaceholder}>
								<div>Personagem: {nome}</div>
								<div>História: </div>
								<div> {classe}</div>
								<Image
									src='/character-sheet.svg'
									alt='Preview'
									width={50}
									height={50}
									className={styles.imagePreview}
								/>
							</div>
						</div>

						<div className={styles.buttonArea}>
							<button type='button' className={styles.iconClickable}>
								<Image src='/trash.svg' alt='Excluir' width={28} height={28} onClick={handleReset} />
							</button>

							{/*
							Ocultado botão de upload de ficha  
							<button type='button' className={styles.iconClickable}>
								<Image src='/upload.svg' alt='Upload' width={24} height={24} />
							</button>
							*/}
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
