import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  payload: any;
  user_id?: number;
  session_id?: string;
}

interface UseWebSocketProps {
  url: string | null;
  onMessage?: (message: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

const useWebSocket = ({ url, onMessage, onOpen, onClose, onError }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const messageString = JSON.stringify(message);
        ws.current.send(messageString);
        console.log('Mensagem enviada:', message);
      } catch (e) {
        console.error('Erro ao enviar mensagem:', e);
      }
    } else {
      console.warn('WebSocket não conectado. Mensagem não enviada:', message);
    }
  }, []);

  const connect = useCallback(() => {
    if (!url || ws.current) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket conectado');
      setIsConnected(true);
      setError(null);
      onOpen?.();
    };

    ws.current.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        onMessage?.(message);
      } catch (e) {
        console.error('Erro ao parsear mensagem JSON:', e, 'Dados recebidos:', event.data);
      }
    };

    ws.current.onerror = (event) => {
      console.error('Erro no WebSocket:', event);
      setError(event);
      onError?.(event);
    };

    ws.current.onclose = (event) => {
      console.log('WebSocket desconectado:', event.code, event.reason);
      setIsConnected(false);
      ws.current = null;
      onClose?.(event);
      
      if (!event.wasClean) {
        setTimeout(connect, 5000);
      }

    };

  }, [url, onMessage, onOpen, onClose, onError]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
  }, []);

  useEffect(() => {
    if (url) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [url, connect, disconnect]);

  return {
    isConnected,
    error,
    sendMessage,
    disconnect,
    connect
  };
};

export default useWebSocket;