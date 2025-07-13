import { useEffect, useRef, useState, useCallback } from 'react'

interface WebSocketConfig {
	url: string | null
	onMessage?: (message: unknown) => void
	onOpen?: (event: Event) => void
	onClose?: (event: CloseEvent) => void
	onError?: (event: Event) => void
}

interface WebSocketState {
	isConnected: boolean
	error: Event | null 
}

interface WebSocketActions {
	sendMessage: (message: unknown) => void
	disconnect: () => void
	connect: (url: string) => void
}

const useWebSocket = ({
	url,
	onMessage,
	onOpen,
	onClose,
	onError,
}: WebSocketConfig): WebSocketState & WebSocketActions => {
	const [isConnected, setIsConnected] = useState(false)
	const [error, setError] = useState<Event | null>(null)
	const ws = useRef<WebSocket | null>(null)

	const connect = useCallback(
		(websocketUrl: string) => {
			if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
				// console.log('WebSocket já conectado ou conectando.');
				return
			}
			if (!websocketUrl) {
				// console.log('URL do WebSocket não fornecida para conectar.');
				return
			}
			ws.current = new WebSocket(websocketUrl)

			ws.current.onopen = (event) => {
				// console.log('WebSocket conectado.');
				setIsConnected(true)
				setError(null)
				onOpen?.(event)
			}

			ws.current.onmessage = (event) => {
				// console.log('Mensagem recebida:', event.data);
				try {
					const message = JSON.parse(event.data)
					onMessage?.(message)
				} catch (_e) {
					// console.error('Erro ao parsear mensagem JSON:', _e);
				}
			}

			ws.current.onerror = (event) => {
				setError(event)
				setIsConnected(false)
				onError?.(event)
			}

			ws.current.onclose = (event) => {
				setIsConnected(false)
				if (event.code === 1000) {
					setError(null)
				}
				onClose?.(event)
			}
		},
		[onMessage, onOpen, onClose, onError]
	)

	const disconnect = useCallback(() => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			// console.log('Desconectando WebSocket...');
			ws.current.close()
		} else {
			// console.log('WebSocket já desconectado ou não conectado.');
		}
	}, [])

	const sendMessage = useCallback((message: unknown) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			try {
				const jsonMessage = JSON.stringify(message)
				ws.current.send(jsonMessage)
			} catch (_e) {
				// console.error('Erro ao enviar mensagem:', _e)
			}
		} else {
			// console.warn('WebSocket não está aberto. Não é possível enviar mensagem.');
		}
	}, [])

	useEffect(() => {
		if (url) {
			connect(url)
		} else {
			disconnect()
		}

		return () => {
			disconnect()
		}
	}, [url, connect, disconnect])

	return { isConnected, error, sendMessage, disconnect, connect }
}

export default useWebSocket
