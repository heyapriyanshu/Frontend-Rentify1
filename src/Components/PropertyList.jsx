// src/components/PropertyList.js

import React from 'react';
import Card from './Other/Card';
import { useAuth } from './security/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';

function PropertyList({ properties }) {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  
  return (
    <Container fluid>
      <Row>
        {properties.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card
              propertyId={card.id}
              bhk={card.bhk}
              title={card.title}
              location={card.location}
              price={card.price}
              isAuthenticated={isAuthenticated}
              likes={card.likes}
              nearby={card.nearby}
              image={card.propertyImage}
              ownerId={card.ownerId}
              
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PropertyList;
