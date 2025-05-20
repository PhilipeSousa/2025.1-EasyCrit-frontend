import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.orangeContainer}>
        <div className={styles.blackContainer}>
          <div className={styles.grayContainer}>

            <div className={styles.formWrapper}>
              <form>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={styles.inputField}
                    placeholder="exemplo@email.com"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    id="senha"
                    className={styles.inputField}
                    placeholder="••••••••"
                  />
                </div>

                <div className={styles.Account}>
                  Esqueceu sua senha? <Link href="/EsqueceuSenha">Clique aqui</Link>
                </div>

                <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.submitButton}>
                    ACESSAR CONTA
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo-easycrit-rounded.png"
                alt="EasyCrit Logo"
                layout="responsive"
                width={200}
                height={200}
                className={styles.logo}
                priority
              />
              <div className={styles.AccountNew}>
                Não tem uma conta? <Link href="/cadastro">Clique aqui</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
