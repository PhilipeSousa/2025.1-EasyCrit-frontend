'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent, useRef } from 'react'
import styles from './create-campaign.module.css'

export default function CreateCampaignPage() {
  const [campaignName, setCampaignName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [mapName, setMapName] = useState('')
  const [startTime, setStartTime] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [mapPreview, setMapPreview] = useState<string | null>(null)
  const [mapFileName, setMapFileName] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [dragging, setDragging] = useState(false)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  function handleMapUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setMapPreview(URL.createObjectURL(file))
      setMapFileName(file.name)
      setTranslate({ x: 0, y: 0 })
      setZoom(1)
    }
  }

  function onDragStart(e: React.MouseEvent) {
    e.preventDefault()
    setDragging(true)
    setOrigin({ x: e.clientX, y: e.clientY })
  }

  function onDragEnd() {
    setDragging(false)
    setOrigin(null)
  }

  function onDragMove(e: React.MouseEvent) {
    if (!dragging || !origin) return
    e.preventDefault()
    if (!containerRef.current || !imgRef.current) return

    const dx = e.clientX - origin.x
    const dy = e.clientY - origin.y

    let newX = translate.x + dx
    let newY = translate.y + dy

    const container = containerRef.current.getBoundingClientRect()
    const img = imgRef.current.getBoundingClientRect()

    const realWidth = imgRef.current.naturalWidth * zoom
    const realHeight = imgRef.current.naturalHeight * zoom

    if (realWidth > container.width) {
      const minX = container.width - realWidth
      if (newX < minX) newX = minX
      if (newX > 0) newX = 0
    } else {
      newX = 0
    }

    if (realHeight > container.height) {
      const minY = container.height - realHeight
      if (newY < minY) newY = minY
      if (newY > 0) newY = 0
    } else {
      newY = 0
    }

    setTranslate({ x: newX, y: newY })
    setOrigin({ x: e.clientX, y: e.clientY })
  }

  function zoomIn() {
    setZoom((z) => Math.min(z + 0.2, 3))
  }

  function zoomOut() {
    setZoom((z) => Math.max(z - 0.2, 1))
    setTranslate({ x: 0, y: 0 })
  }

  function resetPosition() {
    setZoom(1)
    setTranslate({ x: 0, y: 0 })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!campaignName.trim()) newErrors.campaignName = 'Campo obrigatório'
    if (!description.trim()) newErrors.description = 'Campo obrigatório'
    if (!startDate.trim()) newErrors.startDate = 'Campo obrigatório'
    if (!mapPreview) newErrors.mapPreview = 'Por favor, faça upload do mapa'
    if (!mapName.trim()) newErrors.mapName = 'Campo obrigatório'
    if (!startTime.trim()) newErrors.startTime = 'Campo obrigatório'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert('Formulário enviado com sucesso!')
    }
  }

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navLeft}>
          <Image src='/images/logo-easycrit-rounded.png' alt='EasyCrit Logo' width={45} height={45} priority />
          <span className={styles.siteName}>EasyCrit</span>
        </div>
        <div className={styles.navRight}>
          <Link href='/'>
            <Image src='/images/user-circle.png' alt='User Icon' width={30} height={30} />
          </Link>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.formBox} noValidate>
          <h2 className={styles.title}>Crie sua aventura</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <label htmlFor='campaignName'>Nome da campanha</label>
              <input
                id='campaignName'
                type='text'
                placeholder='Nome da campanha'
                className={styles.inputField}
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
              />
              {errors.campaignName && <p className={styles.errorMsg}>{errors.campaignName}</p>}

              <label htmlFor='description'>Descrição</label>
              <textarea
                id='description'
                rows={6}
                placeholder='Descrição da campanha'
                className={`${styles.inputField} ${styles.descriptionField}`}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              {errors.description && <p className={styles.errorMsg}>{errors.description}</p>}

              <label htmlFor='startDate'>Data de início</label>
              <input
                id='startDate'
                type='date'
                className={styles.inputField}
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              {errors.startDate && <p className={styles.errorMsg}>{errors.startDate}</p>}

              <button
                type='button'
                className={styles.cancelButton}
                onClick={() => {
                  setCampaignName('')
                  setDescription('')
                  setStartDate('')
                  setMapPreview(null)
                  setMapFileName(null)
                  setMapName('')
                  setStartTime('')
                  setErrors({})
                  resetPosition()
                }}
              >
                Cancelar
              </button>
            </div>

            <div className={styles.column}>
              <label>Preview do mapa</label>
              <div
                className={styles.map}
                ref={containerRef}
                onMouseDown={onDragStart}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
                onMouseMove={onDragMove}
                style={{ cursor: dragging ? 'grabbing' : 'grab' }}
              >
                <div className={styles.mapPreview}>
                  {mapPreview ? (
                    <img
                      ref={imgRef}
                      src={mapPreview}
                      alt='Mapa Preview'
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        userSelect: 'none',
                        pointerEvents: 'none',
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                        transition: dragging ? 'none' : 'transform 0.2s ease',
                        borderRadius: '4px',
                        width: 'auto',
                        height: 'auto',
                        maxWidth: 'none',
                        maxHeight: 'none',
                      }}
                      draggable={false}
                    />
                  ) : (
                    <span style={{ fontSize: '48px' }}>🗺️</span>
                  )}
                </div>
                <div className={styles.sideIcons}>
                  <button
                    type='button'
                    aria-label='Remover mapa'
                    className={styles.trashButton}
                    onClick={() => {
                      setMapPreview(null)
                      setMapFileName(null)
                      resetPosition()
                    }}
                  >
                    🗑️
                  </button>
                  <label htmlFor='mapUpload' className={styles.uploadButton}>
                    📁
                    <input
                      id='mapUpload'
                      type='file'
                      accept='image/*'
                      onChange={handleMapUpload}
                      className={styles.fileInput}
                    />
                  </label>
                  <button type='button' className={styles.zoomButton} onClick={zoomIn} title='Zoom In'>
                    ＋
                  </button>
                  <button type='button' className={styles.zoomButton} onClick={zoomOut} title='Zoom Out'>
                    －
                  </button>
                  <button type='button' className={styles.zoomReset} onClick={resetPosition} title='Resetar posição'>
                    ↻
                  </button>
                </div>
              </div>
              {mapFileName && <p className={styles.mapFileName}>Arquivo: {mapFileName}</p>}
              {errors.mapPreview && <p className={styles.errorMsg}>{errors.mapPreview}</p>}

              <label htmlFor='mapName'>Nome do mapa</label>
              <input
                id='mapName'
                type='text'
                placeholder='Nome do mapa'
                className={styles.inputField}
                value={mapName}
                onChange={e => setMapName(e.target.value)}
              />
              {errors.mapName && <p className={styles.errorMsg}>{errors.mapName}</p>}

              <label htmlFor='startTime'>Horário de início</label>
              <input
                id='startTime'
                type='time'
                className={styles.inputField}
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
              {errors.startTime && <p className={styles.errorMsg}>{errors.startTime}</p>}

              <button type='submit' className={styles.submitButton}>
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

