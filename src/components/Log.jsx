export default function Log({turns}) {
  return(
    <ol id="log">
      {turns.map((ele) => {
        return(
        <li key={`${ele.square.row}${ele.square.col}}`}>
          {ele.player} selected {ele.square.row}, {ele.square.col}
        </li>
        )
      })}
    </ol>
  )
}