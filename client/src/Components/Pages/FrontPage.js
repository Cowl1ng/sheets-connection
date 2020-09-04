import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MatchList from '../MatchList.js'

import ResponseContext from '../../context/responseContext'

require('dotenv').config()

const FrontPage = () => {
  const responseContext = useContext(ResponseContext)
  const { getMatchStats, orderStats, match } = responseContext

  const formik = useFormik({
    initialValues: {
      matchID: '',
      apiKey: 'API_KEY_1',
    },
    onSubmit: async (values) => {
      const { matchID, apiKey } = values
      getMatchStats(matchID, apiKey)
      // alert(JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {
    orderStats()
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
            </select>
            <br />
            <button type='submit'>Submit</button>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {match ? (
              <div>
                {match.data.batting.map((team) =>
                  team.scores.map((batter) => (
                    <h1>
                      Batter: {batter.batsman}
                      <br />
                      Runs: {batter.R}
                      <br />
                      Balls: {batter.B}
                      <br />
                      <br />
                    </h1>
                  ))
                )}
              </div>
            ) : (
              <div>
                <h1>Match Not loaded</h1>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
