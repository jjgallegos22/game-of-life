import { useState } from 'react'
import { useInterval, getRandom } from './utils'
import {
    Button,
    ButtonContainer,
    BoardContainer,
    RowContainer,
    Square,
    TitleContainer
} from './Grid.style'

const X_LENGTH = 30;
const Y_LENGTH = 30;

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

const getLiveNeighbors = (matrix, i, j) => {
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
     return live;
 }

const algorithm = (matrix) => {
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

const resetMartrix = () => {
    let result = []
    for (let y = 0; y < Y_LENGTH; y++) {
        const row = [];
        for (let x = 0; x < X_LENGTH; x++) {
            const rand = getRandom(100)
            row.push(rand > 30 && rand < 60 ? true : false )
        }
        result.push(row)
    }
    return result
}

export const Grid = () => {
    const [matrix, setMatrix] = useState(resetMartrix())
    const [interval, setInterval] = useState(1000)

    useInterval(() => {
        setMatrix(algorithm(matrix))
    }, interval)


    return (
        <BoardContainer>
            <TitleContainer>
            Conway's Game of Life
            </TitleContainer>
            {createBoard(matrix)}
            <ButtonContainer>
                <Button onClick={() => { setMatrix(resetMartrix) }}>
                    Reset
                </Button>
                <div>
                    Speed: 
                    <Button
                        onClick={() => {
                            if(interval > 0) {
                                setInterval(interval - 100)
                            }
                        }}
                        disabled={interval === 0}
                    >
                        -
                    </Button>
                    <Button
                        onClick={() => {
                            if(interval < 1000) {
                                setInterval(interval + 100)
                            }
                        }}
                        disabled={interval === 1000}
                    >
                        +
                    </Button>
                </div>
            </ButtonContainer>
        </BoardContainer>
    )
}
