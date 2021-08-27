import styled from 'styled-components'

export const Square = styled.div`
  display: flex;
  background: ${ props => props.alive ? 'black' : 'white'};
  border: 1px solid black;
  height: 20px;
  width: 20px;
`

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
`

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`

export const Button = styled.button`
    margin-left: 5px;
    margin-right: 5px;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-family:  "Gills Sans", sans-serif;
    font-size: 22px;
    margin-bottom: 20px;
`