// const InitialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null]
// ]

export default function GameBoard({onSelectSquare, board}) {
  // let gameBoard = InitialGameBoard

  // for(const turn of turns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player
  // }
  // const [gameBoard, setGameBoard] = useState(InitialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevBoard) => {
  //     const updateBoard = [...prevBoard.map(innerArray => [...innerArray])]
  //     updateBoard[rowIndex][colIndex] = activePlayerSymbol
  //     console.log(updateBoard)
  //     return updateBoard
  //   })
  //   onSelectSquare()
  // }
  //console.log(gameBoard);
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            ))}

          </ol>
        </li>
      ))}
    </ol>
  )
}