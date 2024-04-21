import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { User } from './style';

const Header = () => {
  return (
    <div className='py-3 bg-white'>
      <Container>
        <Row>
          <Col>
            <img src={require('../../assets/logo.png')} width={267} height={42} alt="Logo" />
          </Col>
          <Col className='d-flex justify-content-end'>
            <Row>
              <Col xs={3}>
                <img src={require('../../assets/profile.png')} width={43} height={42} alt="Otávio Oliveira" />
              </Col>
              <Col className='d-flex align-items-center'>
                <User>Otávio Oliveira</User>
              </Col>
              <Col className='d-flex align-items-center' xs={2}>
                <img src={require('../../assets/logout.png')} width={26} height={26} alt="Logout" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
