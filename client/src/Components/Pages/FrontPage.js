import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MatchList from '../MatchList.js'

import ResponseContext from '../../context/responseContext'

require('dotenv').config()

const FrontPage = () => {
  const responseContext = useContext(ResponseContext)
  const { getMatchStats, orderStats, match, matchScore } = responseContext

  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const formik = useFormik({
    initialValues: {
      matchID: '',
      apiKey: 'API_KEY_1',
    },
    onSubmit: async (values) => {
      const { matchID, apiKey } = values
      getMatchStats(matchID, apiKey)
      // alert(JSON.stringify(values, null, 2))
      setLoading(true)
    },
  })

  useEffect(() => {
    orderStats()
    setLoading(false)
    if (match) {
      setLoaded(true)
    } else {
      setLoaded(false)
    }
  }, [match])
  return (
    <Container fluid>
      <Row className='justify-content-md-center mt-3'>
        <Col lg={6}>
          <MatchList />
        </Col>
        <Col lg={3}>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor='matchID'>Match ID</label>
            <input
              id='matchID'
              name='matchID'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.matchID}
            />
            <br />
            <label htmlFor='apiKey'>API key</label>
            <select
              id='apiKey'
              name='apiKey'
              onChange={formik.handleChange}
              value={formik.values.apiKey}
            >
              <option value='API_KEY_1'>API Key 1</option>
              <option value='API_KEY_2'>API Key 2</option>
              <option value='API_KEY_2'>API Key 3</option>
              <option value='API_KEY_2'>API Key 4</option>
              <option value='API_KEY_2'>API Key 5</option>
            </select>
            <br />
            <button type='submit'>Submit</button>
          </form>

          {loading ? (
            <h1>LOADING...</h1>
          ) : loaded ? (
            <h1>
              {matchScore.description}
              <br />
              {match.creditsLeft} credits left
            </h1>
          ) : (
            <h1>Not loaded</h1>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
