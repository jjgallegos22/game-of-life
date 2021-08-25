import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const X_LENGTH = 30;
const Y_LENGTH = 30;

const BOAT = [
    [ 0, 2 ],
    [ 1, 1 ],
    [ 1, 3 ],
    [ 2, 2 ],
    [ 2, 3 ],
]

const SEED = [
    [ 1, 2 ],
    [ 1, 3 ],
    [ 2, 1 ],
    [ 2, 2 ],
    [ 3, 2 ],
]

const Square = styled.div`
  display: flex;
  background: ${ props => props.alive ? 'black' : 'white'};
  border: 1px solid black;
  height: 20px;
  width: 20px;
`

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`

const createMatrix = (state) => {
    const board = [];
    for (let i = 0; i < Y_LENGTH; i++) {
        const row = [];
        for (let j = 0; j < X_LENGTH; j++) {
            row.push(false)
        }
        board.push(row)
    }
    for(let i = 0; i < state.length; i++) {
        const x = state[i][0];
        const y = state[i][1];
        board[x][y] = true; 
    }

    return board;
}

const renderSquare = (alive) => {
  return (
    <Square alive={alive}/>
  )
}

const renderRow = (row) => {
  const result = []
  for(let i = 0; i < row.length; i++) {
    result.push(renderSquare(row[i]))
  }
  return (
    <RowContainer>
      {result}
    </RowContainer>
  )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
        savedCallback.current();
        }
        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay]);
}
  
  const algorithm = (state) => {
     const temp = state
     let update = false;
     for (let i = 0; i < temp.length; i++) {
         if (temp[i][0] < X_LENGTH - 1) {
             temp[i][0] = temp[i][0] + 1;
             update = true;
         }
         if (temp[i][1] < Y_LENGTH - 1) {
             temp[i][1] = temp[i][1] + 1;
             update = true;
         }
     }
     if(update) {
         return temp
     }
     return null;
 }

 function getLiveNeighbors(matrix, i, j) {
     let live = 0;
     if(i - 1 > 0) {
        live = matrix[i-1][j] ? live + 1 : live
     }
     if (i + 1 < matrix.length) {
        live = matrix[i+1][j] ? live + 1 : live
     }
     if (j - 1 > 0) {
        live = matrix[i][j-1] ? live + 1 : live
     }
     if (j + 1 < matrix[i].length) {
        live = matrix[i][j+1] ? live + 1 : live
     }

     if (i - 1 > 0 && j - 1 > 0) {
        live = matrix[i-1][j-1] ? live + 1 : live
     }
     if (i - 1 >= 0 && j + 1 < matrix[i].length) {
        live = matrix[i-1][j+1] ? live + 1 : live
     }
     if (i + 1 < matrix.length && j - 1 > 0) {
        live = matrix[i+1][j-1] ? live + 1 : live
     }
     if (i + 1 < matrix.length && j + 1 < matrix[i].length) {
        live = matrix[i+1][j+1] ? live + 1 : live
     }
     console.log(live, i, j)
     return live;
 }

 function algo(matrix) {
    // Any live cell with fewer than two live neighbors dies, as if caused by under population.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    let result = []
    for (let y = 0; y < matrix.length; y++) {
        const row = [];
        for (let x = 0; x < matrix[y].length; x++) {
            row.push(false)
        }
        result.push(row)
    }

    for (let i = 0; i < matrix.length; i++) {
        for( let j = 0; j < matrix[i].length; j++) {
            const neighbors = getLiveNeighbors(matrix, i, j);
            if (matrix[i][j]) {
                if (neighbors > 1 && neighbors < 4) {
                    result[i][j] = true;
                } else {
                    result[i][j] = false;
                }
            } else {
                if (neighbors === 3) {
                    result[i][j] = true;
                } else {
                    result[i][j] = false;
                }
            }
        }
    }
    return result
 }
 
 const createBoard = (matrix) => {
     const board = []
     for(let i = 0; i < matrix.length; i++) {
         board.push(renderRow(matrix[i]))
     }
     return board
 }

 function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

 const createInitState = () => {
    let result = []
    for (let y = 0; y < Y_LENGTH; y++) {
        const row = [];
        for (let x = 0; x < X_LENGTH; x++) {
            const rand = getRandomInt(100)
            row.push(rand > 40 && rand < 60 ? true : false )
        }
        result.push(row)
    }
    return result
 }

export const Grid = () => {
    //const [state, setState] = useState(BOAT)
    //const [matrix, setMatrix] = useState(createMatrix(SEED))
    const [matrix, setMatrix] = useState(createInitState())
    /*useInterval(() => {
        const updatedState = algorithm(state)
        if(updatedState !== null) {
            setState(updatedState)
            setMatrix(createMatrix(state))
        }
    }, 1000)*/


    useInterval(() => {
        setMatrix(algo(matrix))
    }, 1000)


    return (
        <BoardContainer>
            {createBoard(matrix)}
        </BoardContainer>
    )
}
