'use client'

import React, { useState, useEffect } from 'react'
import './app.css'
import styles from '../dashboard-master/dashboard.module.css'
import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import useWebSocket from '@/hooks/useWebSocket' // Importar o hook WebSocket

// TODO: Substitua pelo caminho real do seu hook ou contexto de autenticação
// import { useAuth } from '@/contexts/AuthContext';
// TODO: Defina um tipo para o objeto de usuário retornado pelo seu hook de autenticação
// interface User {
//   id: number; // Ou string, dependendo do seu backend
//   // Outras propriedades do usuário...
// }

const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['700'],
})

const Box = () => {
    const campaigns = [
        { logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
        { logo: '/images/spider.png', title: 'A FLOREsta RADIOATIVA' },
    ];

    return (
        <div className={styles.boxContainer}>
            {campaigns.map(({ logo, title }, idx) => (
                <div key={idx} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
                        <span className={styles.cardTitle}>{title}</span>
                    </div>

                    <div className={styles.cardContent}>
                        <div className={styles.cardColumn}>
                            <div className={styles.sectionTitle}>MESTRE</div>
                            <div className={styles.sectionTitle}>JOGADORES</div>
                            <div className={styles.playersGrid}>
                                {[1, 2, 3, 4].map((i) => (
                                    <Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.cardColumn}>
                            <div className={styles.sectionTitleRight}>MAPA</div>
                            <Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} />
                            <div className={styles.mapName}>NOME DO MAPA</div>
                            <div className={styles.sectionTitle}>ESTATISTICAS</div>

                            <div className={styles.statItem}>
                                <Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
                                <span>00:00:00</span>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.statItem}>
                                <Image src='/images/check.png' alt='Check' width={25} height={25} />
                                <span>SESSÕES REALIZADAS</span>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.statItem}>
                                <Image src='/images/calendar.png' alt='Calendário' width={25} height={25} />
                                <span>00/00/0000</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


const Page: React.FC = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [websocketUrl, setWebsocketUrl] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState<string | null>(null);

    // TODO: Use seu hook ou contexto de autenticação real aqui para obter o usuário e o token
    // Exemplo:
    // const { user, token } = useAuth();
    // const user: User | null = { id: 123 }; // REMOVA esta linha e use o user real
    // const token: string | null = 'seu_token_jwt_aqui'; // REMOVA esta linha e use o token real

    // Placeholder para user e token (REMOVA ESTAS LINHAS QUANDO INTEGRAR A AUTENTICAÇÃO REAL)
    const user: { id: number } | null = { id: 123 }; // Exemplo de estrutura mínima do usuário
    const token: string | null = 'seu_token_jwt_aqui'; // Exemplo de token

    const { isConnected, error, sendMessage, disconnect, connect } = useWebSocket({
        url: websocketUrl,
        onMessage: (message) => {
            console.log('Mensagem recebida no componente Jogador:', message);
            setMessages((prevMessages) => [...prevMessages, message]); // Adiciona a mensagem ao estado
        },
        onOpen: () => {
            console.log('Conexão WebSocket aberta no componente Jogador.');
            setJoinError(null);
            // Opcional: Enviar uma mensagem inicial após a conexão
            // Use o user.id real aqui
            if (user?.id) {
                sendMessage({ type: 'user_connected', user_id: user.id });
            }
        },
        onClose: (event) => {
            console.log('Conexão WebSocket fechada no componente Jogador.', event);
            setWebsocketUrl(null);
        },
        onError: (event) => {
            console.error('Erro no WebSocket no componente Jogador:', event);
        }
    });

    // Função para lidar com o clique no botão "ENTRAR NA SESSÃO"
    const handleJoinSession = async () => { // Tornar a função assíncrona
        if (!inviteCode.trim()) {
            alert('Por favor, insira um código de convite.');
            return;
        }

        if (!user || !token) {
            alert('Você precisa estar logado para entrar em uma sessão.');
            // TODO: Redirecionar para a página de login se necessário
            // Exemplo com next/navigation:
            // import { useRouter } from 'next/navigation';
            // const router = useRouter();
            // router.push('/login');
            return;
        }

        setIsJoining(true); // Inicia o estado de loading
        setJoinError(null); // Limpa erros anteriores

        const user_id = user.id;

        try {
            const sessionApiPort = process.env.NEXT_PUBLIC_SESSION_PORT || '8081';
            const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
            const joinSessionUrl = `http://${apiHost}:${sessionApiPort}/sessions/join`;

            console.log('Tentando entrar na sessão via HTTP:', joinSessionUrl);

            const response = await fetch(joinSessionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ invite_code: inviteCode.trim(), user_id: user_id }),
            });

            if (!response.ok) {
                // Lidar com erros HTTP (ex: 404 Not Found, 400 Bad Request, 401 Unauthorized, 403 Forbidden)
                const errorData = await response.json();
                throw new Error(errorData.detail || `Erro HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            // Assumindo que a resposta contém o session_id
            const session_id = data.session_id;

            if (!session_id) {
                throw new Error('Resposta do backend não contém session_id.');
            }

            console.log('Entrou na sessão com sucesso. Session ID:', session_id);

            // Agora que temos o session_id, construímos a URL do WebSocket e conectamos
            // O endpoint WebSocket é ws://{host}:{port}/ws/sessions/{session_id}/connect/{user_id}
            const wsUrl = `ws://${apiHost}:${sessionApiPort}/ws/sessions/${session_id}/connect/${user_id}`; // Ajuste o caminho se necessário

            setWebsocketUrl(wsUrl); // Define a URL para iniciar a conexão via hook

        } catch (error: any) {
            console.error('Erro ao entrar na sessão:', error);
            // Exibir uma mensagem de erro amigável para o usuário
            setJoinError(error.message || 'Ocorreu um erro desconhecido ao tentar entrar na sessão.');
            setWebsocketUrl(null); // Limpar a URL do WS para não tentar conectar automaticamente
        } finally {
            setIsJoining(false); // Finaliza o estado de loading
        }
    };

    // Função para lidar com o clique no botão "SAIR DA CAMPANHA" (desconectar)
    const handleLeaveSession = () => {
        disconnect(); // Chama a função de desconexão do hook
    };


    return (
        <div className='page-container'>
            {/* SIDE BAR */}
            <div className='sidebar'>
                <div className='logo-container'>
                    <Image src='/images/logo1.png' alt='Logo' className='logo' width={180} height={180} />
                </div>
            </div>

            {/* MAIN AND TOP */}
            <div className='main-and-topbar'>
                <div className='topbar'>
                    <div className='topbar-left'>
                        <Image src='/images/group.png' alt='Ícone TopBar' className='topbar-icon' width={70} height={70} />
                    </div>

                    {/* H1 TOPBAR */}
                    <div className='topbar-content'>
                        <h2 className={`${cinzel.className}`}>DASHBOARD DO JOGADOR</h2>
                    </div>
                    {/* Adicionar botão de logout se necessário */}
                    {/* <button className={styles.logoutButton}>LOGOUT</button> */}
                </div>

                <div className='main-content'>
                    <div className={styles.contentWrapper}>
                        <div className={styles.sessionActions}>
                            <input
                                className={styles.sessionInput}
                                placeholder='CÓDIGO DE CONVITE'
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                disabled={isConnected || isJoining || !user} // Desabilita se conectado, entrando, ou não logado
                            />
                            <div className={styles.sessionButtons}>
                                {/* Botão para entrar na sessão (conectar WebSocket) */}
                                <button
                                    className={styles.sessionButton}
                                    onClick={handleJoinSession}
                                    disabled={isConnected || isJoining || !user} // Desabilita se já conectado, entrando, ou não logado
                                >
                                    {isJoining ? 'ENTRANDO...' : (isConnected ? 'CONECTADO' : 'ENTRAR NA SESSÃO')}
                                </button>
                                {/* Botão para sair da campanha (desconectar WebSocket) */}
                                <button
                                    className={`${styles.sessionButton} ${styles.deleteButton}`}
                                    onClick={handleLeaveSession}
                                    disabled={!isConnected || isJoining} // Desabilita se não conectado ou entrando
                                >
                                    SAIR DA CAMPANHA
                                </button>
                            </div>

                            {/* Exibir status da conexão e mensagens (para debug/demonstração) */}
                            <div style={{ marginTop: '1rem', color: isConnected ? 'green' : 'red' }}>
                                Status da Conexão WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
                            </div>
                            {/* Exibir erro de conexão WebSocket */}
                            {error && <div style={{ color: 'red' }}>Erro WS: {error.type}</div>}
                            {/* Exibir erro ao tentar entrar na sessão via HTTP */}
                            {joinError && <div style={{ color: 'red' }}>Erro ao Entrar: {joinError}</div>}
                            {/* Mensagem se o usuário não estiver logado */}
                            {!user && <div style={{ color: 'orange', marginTop: '1rem' }}>Por favor, faça login para entrar em uma sessão.</div>}


                            {/* Exibir mensagens recebidas (para debug/demonstração) */}
                            <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                                <h4>Mensagens Recebidas:</h4>
                                {messages.map((msg, index) => (
                                    <p key={index}>{JSON.stringify(msg)}</p>
                                ))}
                            </div>

                        </div>

                        <div className={styles.boxContainer}>
                            <Box />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;