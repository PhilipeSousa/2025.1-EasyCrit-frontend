'use client'

import React, { useState, useEffect } from 'react'
import './app.css'
import styles from '../dashboard-master/dashboard.module.css'
import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import useWebSocket from '@/hooks/useWebSocket'

const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['700'],
})

const Box = () => {
    const campaigns = [
        { logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
        { logo: '/images/spider.png', title: 'A FLORESTA RADIOATIVA' },
    ];

    return (
        <div className={styles.boxContainer}> {}
            {campaigns.map(({ logo, title }, idx) => (
                <div key={idx} className={styles.card}> {}
                    <div className={styles.cardHeader}> {}
                        <Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
                        <span className={styles.cardTitle}>{title}</span> {}
                    </div>

                    <div className={styles.cardContent}> {}
                        <div className={styles.cardColumn}> {}
                            <div className={styles.sectionTitle}>MESTRE</div> {}
                            <div className={styles.sectionTitle}>JOGADORES</div> {}
                            <div className={styles.playersGrid}> {}
                                {[1, 2, 3, 4].map((i) => (
                                    <Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.cardColumn}> {}
                            <div className={styles.sectionTitleRight}>MAPA</div> {}
                            <Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} /> {}
                            <div className={styles.mapName}>NOME DO MAPA</div> {}
                            <div className={styles.sectionTitle}>ESTATISTICAS</div> {}

                            <div className={styles.statItem}> {}
                                <Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
                                <span>00:00:00</span>
                            </div>
                            <div className={styles.divider}></div> {}
                            <div className={styles.statItem}> {}
                                <Image src='/images/check.png' alt='Check' width={25} height={25} />
                                <span>SESSÕES REALIZADAS</span>
                            </div>
                            <div className={styles.divider}></div> {}
                            <div className={styles.statItem}> {}
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
    const session_id = 'master_session_123'; // Substitua por lógica real para obter o ID da sessão do mestre
    const user_id = 456; // Substitua por lógica real para obter o ID do usuário mestre

    const wsHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const wsPort = process.env.NEXT_PUBLIC_SESSION_PORT || '8081';
    const websocketUrl = `ws://${wsHost}:${wsPort}/ws/sessions/${session_id}/connect/${user_id}`;

    const [messages, setMessages] = useState<any[]>([]); // Estado para mensagens recebidas (exemplo)

    const { isConnected, error, sendMessage, disconnect } = useWebSocket({
        url: websocketUrl,
        onMessage: (message) => {
            console.log('Mensagem recebida no componente Mestre:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        },
        onOpen: () => {
            console.log('Conexão WebSocket aberta no componente Mestre.');
            sendMessage({ type: 'master_connected', session_id: session_id, user_id: user_id });
        },
        onClose: (event) => {
            console.log('Conexão WebSocket fechada no componente Mestre.', event);
        },
        onError: (event) => {
            console.error('Erro no WebSocket no componente Mestre:', event);
        }
    });

    // Opcional: Efeito para desconectar ao sair da página
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);


    return (
        <div className='page-container'> {}
            {/* SIDEBAR */}
            <div className='sidebar'> {}
                <div className='logo-container'> {}
                    {}
                    <Image src='/images/logo1.png' alt='Logo' className='logo' width={180} height={180} /> {}
                </div>
            </div>

            {/* MAIN AND TOPBAR */}
            <div className='main-and-topbar'> {}
                <div className='topbar'> {}
                    <div className='topbar-left'> {}
                        {}
                        <Image src='/images/light-icon.png' alt='Ícone TopBar' className='topbar-icon' width={70} height={70} /> {}
                    </div>

                    <div className='topbar-content'> {}
                        <h2 className={`${cinzel.className}`}>DASHBOARD DO MESTRE</h2>
                    </div>
                    {/* Adicionar botão de logout se necessário */}
                    {/* <button className={styles.logoutButton}>LOGOUT</button> */}
                </div>

                <div className='main-content'> {}
                    <div className={styles.contentWrapper}> {}
                        <div className={styles.sessionActions}> {}
                            <button className={styles.sessionButton}>CRIAR CAMPANHA</button> {}
                            <button className={`${styles.sessionButton} ${styles.deleteButton}`}>EXCLUIR CAMPANHA</button> {/* Classes de dashboard.module.css */}

                            {/* Exibir status da conexão e mensagens (para debug/demonstração) */}
                            <div style={{ marginTop: '1rem', color: isConnected ? 'green' : 'red' }}>
                                Status da Conexão WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
                            </div>
                            {error && <div style={{ color: 'red' }}>Erro: {error.type}</div>} {/* Melhorar exibição do erro */}

                            {/* Exibir mensagens recebidas (para debug/demonstração) */}
                            <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                                <h4>Mensagens Recebidas (Mestre):</h4>
                                {messages.map((msg, index) => (
                                    <p key={index}>{JSON.stringify(msg)}</p>
                                ))}
                            </div>

                        </div>

                        <div className={styles.boxContainer}> {}
                            <Box />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;