import { useEffect, useRef, useState, useCallback } from 'react'

interface WebSocketConfig {
	url: string | null // URL do WebSocket, pode ser null inicialmente
	onMessage?: (message: unknown) => void // Corrigido: Usar unknown ou um tipo mais específico
	onOpen?: (event: Event) => void
	onClose?: (event: CloseEvent) => void
	onError?: (event: Event) => void // Corrigido: Usar Event
}

interface WebSocketState {
	isConnected: boolean
	error: Event | null // Corrigido: Usar Event
}

interface WebSocketActions {
	sendMessage: (message: unknown) => void // Corrigido: Usar unknown ou um tipo mais específico
	disconnect: () => void
	connect: (url: string) => void // Adicionado função connect explícita se necessário
}

const useWebSocket = ({
	url,
	onMessage,
	onOpen,
	onClose,
	onError,
}: WebSocketConfig): WebSocketState & WebSocketActions => {
	const [isConnected, setIsConnected] = useState(false)
	const [error, setError] = useState<Event | null>(null) // Corrigido: Usar Event
	const ws = useRef<WebSocket | null>(null)

	// Função para conectar
	const connect = useCallback(
		(websocketUrl: string) => {
			if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
				// console.log('WebSocket já conectado ou conectando.'); // Removido console.log
				return
			}
			if (!websocketUrl) {
				// console.log('URL do WebSocket não fornecida para conectar.'); // Removido console.log
				return
			}

			// console.log(`Tentando conectar WebSocket em: ${websocketUrl}`); // Removido console.log
			ws.current = new WebSocket(websocketUrl)

			ws.current.onopen = (event) => {
				// console.log('WebSocket conectado.'); // Removido console.log
				setIsConnected(true)
				setError(null) // Limpa qualquer erro anterior
				onOpen?.(event)
			}

			ws.current.onmessage = (event) => {
				// console.log('Mensagem recebida:', event.data); // Removido console.log
				try {
					const message = JSON.parse(event.data)
					onMessage?.(message)
				} catch (_e) {
					// Adicionado _ para ignorar o parâmetro e
					// console.error('Erro ao parsear mensagem JSON:', _e); // Removido console.error
					// Opcional: Chamar onError ou onMessage com o erro de parse
				}
			}

			ws.current.onerror = (event) => {
				// console.error('Erro no WebSocket:', event); // Removido console.error
				setError(event)
				setIsConnected(false) // Considerar erro como desconexão
				onError?.(event)
			}

			ws.current.onclose = (event) => {
				// console.log('WebSocket desconectado.', event); // Removido console.log
				setIsConnected(false)
				// Opcional: Limpar o erro se o fechamento for normal (code 1000)
				if (event.code === 1000) {
					setError(null)
				}
				onClose?.(event)
			}
		},
		[onMessage, onOpen, onClose, onError]
	) // Dependências do useCallback

	// Função para desconectar
	const disconnect = useCallback(() => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			// console.log('Desconectando WebSocket...'); // Removido console.log
			ws.current.close()
		} else {
			// console.log('WebSocket já desconectado ou não conectado.'); // Removido console.log
		}
	}, [])

	// Função para enviar mensagem
	const sendMessage = useCallback((message: unknown) => {
		// Corrigido: Usar unknown
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			try {
				const jsonMessage = JSON.stringify(message)
				ws.current.send(jsonMessage)
				// console.log('Mensagem enviada:', jsonMessage); // Removido console.log
			} catch (_e) {
				// Adicionado _ para ignorar o parâmetro e
				// console.error('Erro ao serializar ou enviar mensagem:', _e); // Removido console.error
				// Opcional: Lidar com erro de serialização/envio
			}
		} else {
			// console.warn('WebSocket não está conectado. Mensagem não enviada:', message); // Removido console.warn
			// Opcional: Lidar com o caso de não estar conectado (ex: enfileirar mensagens)
		}
	}, [])

	// Efeito para conectar quando a URL muda
	useEffect(() => {
		if (url) {
			connect(url)
		} else {
			// Se a URL se tornar null, desconecte
			disconnect()
		}

		// Cleanup function para desconectar ao desmontar o componente ou quando a URL muda
		return () => {
			// console.log('Cleanup: Desconectando WebSocket...'); // Removido console.log
			disconnect()
		}
	}, [url, connect, disconnect]) // Dependências do useEffect

	return { isConnected, error, sendMessage, disconnect, connect }
}

export default useWebSocket
