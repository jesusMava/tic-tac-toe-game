import { useState } from "react"

import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/Gameover";

const PLAYERS = {
  X: 'Player 1', 
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

//afuera porq no ocupamos que la funcion sea recreada cuando 
// el componente sea re-cargado
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  } 

  return gameBoard;
}
function deriveWinner(gameBoard,playerName) {
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol) {
        winner = playerName[firstSquareSymbol];
       }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns)
  const [playerName, setPlayerName] = useState(PLAYERS)
  
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, playerName)
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((currentActivPlayer) => currentActivPlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
     const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns
      ]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName(prevName => {
      return {
        ...prevName,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
    <h1>React Tic-Tac-Toe</h1>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} 
          symbol='X' 
          isActive={activePlayer === 'X'} 
          onChangeName={handlePlayerNameChange}
        />
        <Player initialName={PLAYERS.O}
          symbol='O' 
          isActive={activePlayer === 'O'} 
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
    </main>
  )
}

export default App
