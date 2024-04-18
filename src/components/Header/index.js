import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          Logo
        </Col>
        <Col>
          Usuário
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
