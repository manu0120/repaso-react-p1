import './App.css'
import {useEffect, useState} from 'react'
import {Square} from './components/Square'
import confetti from 'canvas-confetti'
import {TURNS} from './constants'
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import {WinnerModal} from './components/WinnerModal'

function App() {
  // uso de useReducer (otra alternativa): https://chatgpt.com/share/6796bc09-0e40-8011-b037-82d97024e66c
  // nunca se puede usar un useState dentro de un if, ya que van por posiciones fijas en memoria interna
  // cuando cambia un useState, se vuelve a renderizar el componente
  const [board, setBoard] = useState(() => {
    // se pone dentro porque asi no se accede al localStorage cada vez que se renderiza el componente, por lo que sería mas lento
    const boardFromLocalStorage = localStorage.getItem('board');
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null);
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = localStorage.getItem('turn')
    /* ||: Reemplaza cualquier valor "falsy", lo que puede no ser deseado si false o 0 son valores válidos que quieres conservar.
    ??: Solo reemplaza null o undefined, permitiendo que otros valores "falsy" (como false o 0) sean utilizados. */
    return turnFromLocalStorage ?? TURNS.X
  })
  // null: no hay ganador; false: empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    localStorage.removeItem('board')
    localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // Si se hace const newBoard = board, no estaríamos haciendo una copia del array, sino que se estaría creando una referencia al array original en memoria. Si se modifica newBoard, se modifica tambié el array original, porque ambos apuntan al mismo lugar en memoria. Se puede hacer una copia profunda con structuredClone()

    /* No es recomendable hacerlo de esta manera:  
      board[index] = turn
      setBoard(board)

    Porque NO HAY QUE MUTAR NUNCA NI LAS PROPS NI EL ESTADO, siempre hay que crear una copia del que se esta usando y hacer el cambio en esa copia y luego setearla. Podría haber problemas de renderizado (discrepancia). Los datos del renderizado deben ser nuevos   */

    // no actaulizamos cuadrado si ya tiene algo o si hay ganador
    if (board[index] || winner) return

    const newBoard = [...board] // copia superficial
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardamos la partida
    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)

    // revisamos si hay ganador
    // a checkWinner no le pasamos el board, sino el board que ya hayamos actualizado con el turno, ya que la actualización del estado no es síncrona, y habría que pasar otra vez más para ver que hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      localStorage.removeItem('board')
      localStorage.removeItem('turn')
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  // useEffect: se ejecuta minimo una vez, cuando se monta el componente
  // se ejecuta cada vez que se renderiza el componente, porque no tiene dependencias. Si se quisiera hacer una solo vez, se puede usar el hook useLayoutEffect o poner []
  useEffect(() => {
    console.log('useEffect - mount')
  }, [])
  useEffect(() => {
    console.log('useEffect - mount & winner')
  }, [winner])

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear juego</button> 
      <section className="game">
        {
          board.map((value, index) => {
            const uniqueKey = `square-${index}`; // Ejemplo de creación de una clave única
            return (
              // no es recomendable pasar el index como key porque se debe usar un identificador único, y la lista puede cambiar con el tiempo (por ejemplo, si se añaden, eliminan o reordenan elementos)
              <Square key={uniqueKey} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square className='turn' isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square className='turn' isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
