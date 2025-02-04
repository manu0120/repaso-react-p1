import './App.css'
import {useState} from 'react'
import {Square} from './components/Square'


const TURNS = {
  X: 'X',
  O: 'O',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  // uso de useReducer (otra alternativa): https://chatgpt.com/share/6796bc09-0e40-8011-b037-82d97024e66c 
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null: no hay ganador; false: empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] // X u O
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
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

    // revisamos si hay ganador
    // a checkWinner no le pasamos el board, sino el board que ya hayamos actualizado con el turno, ya que la actualización del estado no es síncrona, y habría que pasar otra vez más para ver que hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear juego</button> 
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : `Ganador: ${winner}`
                }
              </h2>

              <header className='win'>
                {
                  winner && <Square>{winner}</Square>
                }
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
