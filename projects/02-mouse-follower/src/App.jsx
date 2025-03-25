import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  // useEffect(() => {
  //   console.log('El efecto se ejecuta después de cada renderizado');
  // })
  // no se puede meter dentro de un condicional un hook
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove: ', {clientX, clientY})
      setPosition({
        x: clientX,
        y: clientY
      })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove)
      setPosition({ x: 0, y: 0 }) // Restablecemos la posición al desactivar
    }
  }, [enabled])

  //change body className
  useEffect(() => {
    if (enabled) {
      // document.body.classList.add('no-cursor')
      document.body.classList.toggle('no-cursor')
    } 
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
      <button onClick={ () => setEnabled(!enabled)}
        className={enabled ? 'no-cursor-button' : ''}>
        { enabled ? 'Desactivar': 'Activar'} seguir puntero 
      </button>
    </>
  )
}

export default App
