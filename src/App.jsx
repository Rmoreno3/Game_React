import { useState } from "react"
import { Square } from "./Components/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import confetti from "canvas-confetti"
import "./index.css"




function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    //revisamos las posiciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // no hay ganador 
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // si ya se jugo esa celda no se actualiza
    if (board[index] || winner) return

    // actualiza la celda
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambia el turno
    const newTturn = turn === TURNS.x? TURNS.o : TURNS.x
    setTurn(newTturn)

    // verifica si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) { // cuando ocurre el empate
      setWinner(false)
    }
  }
  
  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {
            board.map((square, index) => {
              return (
                <Square 
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {square}
                </Square>
              )
            }) 
          }
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>
          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>
        </section>

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Gano:'
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square> }
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>

              </div>
            </section>
          )
        }
      </main>
      <footer className="footer">
        Creado Por Reynaldo Moreno
      </footer>
    </>
  )
}

export default App
