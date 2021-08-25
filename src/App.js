import styled from 'styled-components'
import { Grid } from './Grid'

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`

function App() {
  return (
    <Container>
      <Grid />
    </Container>
  );
}

export default App;
