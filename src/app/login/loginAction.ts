export async function autenticar(email: string, senha: string) {
	try {
		const resposta = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, senha }),
		})

		const dados = await resposta.json()
		return dados
	} catch {
		return { sucesso: false, mensagem: 'Erro na conexão com o servidor.' }
	}
}