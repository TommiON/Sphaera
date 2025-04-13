import './App.css'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import Players from './components/Players'
import Deadlines from './components/Deadlines'

function App() {

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
