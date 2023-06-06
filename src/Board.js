import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// function to randomly return true or false. Math.random will return a value from 0.0 - 1.0
function trueOrfalse(odds) {
  return Math.random() < odds;
}

function Board({ nrows = 5, ncols = 4, chanceLightStartsOn = 0.33 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      // Array.from will return an array length of ncols and the values in that array will be true or false
      initialBoard.push(
        Array.from({ length: ncols }, () => trueOrfalse(chanceLightStartsOn))
      );
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const singleArray = [].concat(...board);

    if (!singleArray.includes(true)) {
      return (
        <>
          <h1>Game over You win</h1>
        </>
      );
    }
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let oldBoardCopy = oldBoard.map((r) => [...r]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  hasWon();

  // TODO

  // make table board

  // TODO

  let gameBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    gameBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{gameBoard}</tbody>
    </table>
  );
}

export default Board;
