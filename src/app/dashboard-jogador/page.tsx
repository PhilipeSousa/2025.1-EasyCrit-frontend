'use client';

import styles from './dashboard.module.css';
import Image from 'next/image';
import React, { JSX, useEffect, useRef, useState } from 'react';

export const Box = (): JSX.Element => {
  const boxStyle: React.CSSProperties = {
    width: '1140px',
    height: '681px',
    backgroundColor: '#071013',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '150px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '20px',
    marginLeft: '320px',
    marginTop: '80px',
    fontFamily: 'Cinzel, serif',
  };

  const shapeStyle: React.CSSProperties = {
    width: '383px',
    height: '501px',
    backgroundColor: '#DFE0E2',
    borderRadius: '8px',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingTop: '50px',
    paddingLeft: '50px',
    fontFamily: 'Cinzel, serif',
  };

  const topRectStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0%',
    width: '100%',
    height: '50px',
    border: '1px solid #071013',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#F77B20',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '15px',
    gap: '10px',
    boxSizing: 'border-box',
    fontFamily: 'Cinzel, serif',
  };

  const logoSize = 40;

  const titleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#071013',
    fontFamily: 'Cinzel, serif',
  };

  const contentContainerStyle: React.CSSProperties = {
    marginTop: '70px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '25px',
    fontFamily: 'Cinzel, serif',
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Cinzel, serif',
  };

  const mestreTextStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
    marginLeft: '15px',
    marginTop: '-40px',
    fontFamily: 'Cinzel, serif',
  };

 
  const mapColumnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '150px'
    
  };

  const statsItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    fontSize: '14px'
    
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    width: '80%',
    backgroundColor: '#071013',
    margin: '10px 0',
  };

  const profileImageStyle: React.CSSProperties = {
    marginTop: '10px',
    borderRadius: '50%',
    marginLeft: '24px',
  };

  const jogadoresTextStyle: React.CSSProperties = {
    marginTop: '15px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#071013',
  };

  const playersGridStyle: React.CSSProperties = {
    marginTop: '10px',
    width: '160px',
    height: '120px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '10px',
    marginLeft: '-12px',
  };

  const scrollBarStyle: React.CSSProperties = {
    width: '21px',
    height: '681px',
    backgroundColor: '#071013',
    borderRadius: '10px',
    marginLeft: '10px',
    marginTop: '80px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  };

  const thumbStyle: React.CSSProperties = {
    width: '12px',
    height: '80px',
    backgroundColor: '#DFE0E2',
    borderRadius: '6px',
    position: 'absolute',
    top: 0,
    cursor: 'grab',
  };

  const thumbRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollbarRef.current) return;
      const deltaY = e.clientY - startY;
      let newTop = scrollTop + deltaY;
      const maxTop = scrollbarRef.current.clientHeight - 80;
      newTop = Math.max(0, Math.min(newTop, maxTop));
      if (thumbRef.current) {
        thumbRef.current.style.top = `${newTop}px`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, scrollTop]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(thumbRef.current?.offsetTop || 0);
  };

  const playerImageSize = 60;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={boxStyle}>
        {[
          { logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
          { logo: '/images/spider.png', title: 'A FLORESTA RADIOATIVA' }
        ].map(({ logo, title }, idx) => (
          <div key={idx} style={shapeStyle}>
            <div style={topRectStyle}>
              <Image
                src={logo}
                alt={`Logo Shape ${idx + 1}`}
                width={logoSize}
                height={logoSize}
              />
              <span style={titleStyle}>{title}</span>
            </div>
            <div style={contentContainerStyle}>
              {/* Game Master and Players*/}
              <div style={columnStyle}>
                <div style={mestreTextStyle}>MESTRE</div>
                <Image
                  src="/images/circle.png"
                  alt="Avatar Mestre"
                  width={70}
                  height={70}
                  style={profileImageStyle}
                />
                <div style={jogadoresTextStyle}>JOGADORES</div>
                <div style={playersGridStyle}>
                  {[1, 2, 3, 4].map(i => (
                    <Image
                      key={i}
                      src="/images/circle.png"
                      alt={`Jogador ${i}`}
                      width={playerImageSize}
                      height={playerImageSize}
                    />
                  ))}
                </div>
              </div>

              {/*(Map and Statistics) */}
              <div style={mapColumnStyle}>
                <div style={{ 
                  ...mestreTextStyle,
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: '75px'
                }}>MAPA</div>
                <Image
                  src="/images/image.png"
                  alt="Mapa da Campanha"
                  width={150}
                  height={120}
                  style={{ 
                    marginTop: '-10px',
                    borderRadius: '4px',
                    marginLeft: '-10px',
                    alignSelf: 'flex-start'
                  }}
                />
                <div style={{ 
                  marginTop: '-10px', 
                  fontSize: '14px',
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: '30px'
                }}>NOME DO MAPA</div>
                
                <div style={{ fontWeight: 'bold', marginTop: '15px' }}>ESTATISTICAS</div>
                
                <div style={statsItemStyle}>
                  <Image
                    src="/images/clock.png"
                    alt="Tempo de Jogo"
                    width={30}
                    height={30}
                    style={{ marginRight: '5px' }}
                  />
                  <span>00:00:00</span>
                </div>
                
                <div style={dividerStyle}></div>
                
                <div style={statsItemStyle}>
                  <Image
                    src="/images/check.png"
                    alt="Sessões Realizadas"
                    width={30}
                    height={30}
                    style={{ marginRight: '5px' }}
                  />
                  <span>SESSÕES REALIZADAS</span>
                </div>
                
                <div style={dividerStyle}></div>
                
                <div style={statsItemStyle}>
                  <Image
                    src="/images/calendar.png"
                    alt="Data"
                    width={30}
                    height={30}
                    style={{ marginRight: '5px' }}
                  />
                  <span>00/00/0000</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={scrollbarRef} style={scrollBarStyle}>
        <div
          ref={thumbRef}
          style={thumbStyle}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          cursor: 'pointer',
          fontFamily: 'Cinzel, serif',
        }}
      >
        <Image
          src="/images/profile.png"
          alt="Ícone Superior Direito"
          width={70}
          height={70}
        />
      </div>

      <header className={styles.topBar}>
        <div className={styles.topBarLogo}>
          <Image
            src="/images/group.png"
            alt="Logo Dashboard"
            width={70}
            height={70}
          />
        </div>
        <h1 style={{ fontFamily: 'Cinzel, serif' }}>DASHBOARD DO JOGADOR</h1>
        <button className={styles.logoutButton}>LOGOUT</button>
      </header>

      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/logo1.png"
              alt="EasyCrit Logo"
              width={250}
              height={250}
              className={styles.logo}
            />
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}></h2>
            <button className={styles.sidebarButton}>ENTRAR NA SESSÃO</button>
            <button className={`${styles.sidebarButton} ${styles.deleteButton}`}>SAIR DA CAMPANHA</button>
            
            {/* CONVITE */}
            <div style={{ marginTop: '-230px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                color: '#071013', 
                fontSize: '14px', 
                marginBottom: '7px',
                textAlign: 'center'
              }}>
                CÓDIGO DE CONVITE PARA SESSÃO
              </span>
              <input 
                type="text" 
                className={`${styles.sidebarButton} ${styles.inviteInput}`}
                style={{ 
                  backgroundColor: '#DFE0E2',
                  color: '#071013',
                  textAlign: 'center',
                  cursor: 'text'
                }}
                placeholder="CÓDIGO DE CONVITE PARA SESSÃO"
              />
            </div>
          </div>
        </div>

        <main className={styles.mainContent}>
          <Box />
        </main>
      </div>
    </>
  );
}