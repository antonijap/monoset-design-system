// Docs-only replacement for react-native-web's Modal. RNW portals modals to the
// document root, so a native Sheet/Dialog demo would cover the whole site. This
// version portals into the nearest PhonePreview screen instead, so overlays
// open inside the phone frame the way they would on a device. Outside a phone
// frame it falls back to the standard full-viewport behavior.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PhoneModal({ visible = false, transparent, animationType = 'none', onRequestClose, children }) {
  const markerRef = useRef(null)
  const wrapperRef = useRef(null)
  const [host, setHost] = useState(null)

  useLayoutEffect(() => {
    setHost(markerRef.current?.closest('[data-ms="phone-screen"]') ?? null)
  }, [])

  useEffect(() => {
    if (!visible) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onRequestClose?.()
      }
    }
    // Capture phase so an autofocused input inside the modal can't swallow it.
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [visible, onRequestClose])

  useEffect(() => {
    if (!visible || animationType === 'none' || !wrapperRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const from = animationType === 'slide'
      ? { transform: 'translateY(16px)', opacity: 0 }
      : { opacity: 0 }
    wrapperRef.current.animate([from, { transform: 'translateY(0)', opacity: 1 }], {
      duration: 200,
      easing: 'cubic-bezier(0.3, 0, 0, 1)',
    })
  }, [visible, animationType])

  const marker = <span ref={markerRef} style={{ display: 'none' }} aria-hidden />
  if (!visible) return marker

  const style = host
    ? { position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column',
        background: transparent ? 'transparent' : '#fff' }
    : { position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column',
        background: transparent ? 'transparent' : '#fff' }

  return (
    <>
      {marker}
      {createPortal(
        <div ref={wrapperRef} role="dialog" aria-modal="true" style={style}>
          {children}
        </div>,
        host ?? document.body,
      )}
    </>
  )
}
