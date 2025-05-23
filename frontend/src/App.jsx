import './App.css'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import Players from './components/Players';
import Deadlines from './components/Deadlines';
import LoginScreen from './components/LoginScreen';

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);

  const logInUser = (userInfo) => {
    setLoggedUser(userInfo);
  }

  if (!loggedUser) {
    return(
      <Container fluid>
          <LoginScreen loginCallback={logInUser}/>
      </Container>
    )
  }
  
  return (
      <Container fluid>
        <Row>
          <Col>
            <Players clubId={1}/>
          </Col>
          <Col>
            <Deadlines/>
          </Col>
        </Row>
      </Container>
  )
}

export default App
