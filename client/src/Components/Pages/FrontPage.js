import React, { useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
require('dotenv').config()
const FrontPage = () => {
  useEffect(() => {
    console.log(`API_KEY: ${process.env.API_KEY}`)
  })
  return (
    <Container>
      <Form>
        <Form.Group controlID='matchID'>
          <Form.Label>Match ID</Form.Label>
          <Form.Control type='text' placeholder='Enter match ID' />
        </Form.Group>
        <Form.Group controlID='apiKey'>
          <Form.Label>API key</Form.Label>
          <Form.Control as='select' type='number' />
          <option>{process.env.API_KEY}</option>
          <option>Add second api key here</option>
          <Form.Text classname='text-muted'>
            No need to change unless limit for the day is reached
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default FrontPage
