// src/app/register/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import styles from './register.module.css'

export default function RegisterPage() {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.header}>
				<Image src='/images/d20.png' alt='EasyCrit Logo' width={25} height={25} className={styles.logo} />
				<span className={styles.headerTitle}>EasyCrit</span>
			</div>

			<div className={styles.mainContainer}>
				<div className={styles.blackContainer}>
					<form className={styles.formWrapper}>
						<h2 className={styles.greeting}>Saudações, aventureiro!</h2>

						<div className={styles.inputGroup}>
							<label htmlFor='email'>Email</label>
							<input type='email' id='email' className={styles.inputField} placeholder='example@email.com' />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='nickname'>Apelido</label>
							<input type='text' id='nickname' className={styles.inputField} placeholder='Seu Apelido' />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='password'>Senha</label>
							<input type='password' id='password' className={styles.inputField} placeholder='••••••••' />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='confirm-password'>Confirmar Senha</label>
							<input type='password' id='confirm-password' className={styles.inputField} placeholder='••••••••' />
						</div>

						<div className={styles.adventureChoice}>
							<div className={styles.chooseAdventure}>Escolha sua aventura</div>
							<div className={styles.roles}>
								<label className={styles.roleOption}>
									<input type='radio' name='role' value='master' className={styles.radioInput} defaultChecked />
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
									<input type='radio' name='role' value='Player' className={styles.radioInput} />
									<Image src='/jogador-icon.svg' alt='Player' width={40} height={40} className={styles.roleImage} />
									<span className={styles.roleLabel}>Jogador</span>
								</label>
							</div>
						</div>

						<button type='submit' className={styles.submitButton}>
							CADASTRAR-SE
						</button>

						<p className={styles.AccountNew}>
							<Link href='/login'>Já tem uma conta?</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}
