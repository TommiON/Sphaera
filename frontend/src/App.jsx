import './App.css'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import Players from './components/Players';
import Deadlines from './components/Deadlines';
import LoginScreen from './components/LoginScreen';
import { setupUserInLocalStorage, wipeCurrentUserFromLocalStorage } from './utils/authenticationUtils';

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);

  const login = (userInfo) => {
      setupUserInLocalStorage(userInfo);
      setLoggedUser(userInfo);
  }

  if (!loggedUser) {
    return(
      <Container fluid>
          <LoginScreen loginCallback={login}/>
      </Container>
    )
  }

  return (
      <Container fluid>
        <Row>
          <Col>
            <Players clubId={loggedUser.clubid}/>
          </Col>
          <Col>
            <Deadlines/>
          </Col>
        </Row>
      </Container>
  )
}

export default App
