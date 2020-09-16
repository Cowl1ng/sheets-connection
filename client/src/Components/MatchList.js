import React, { useContext } from 'react'

import ResponseContext from '../context/responseContext'
import { useEffect } from 'react'

import Card from 'react-bootstrap/Card'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MatchList = () => {
  const responseContext = useContext(ResponseContext)
  const { loadUpcomingMatches, matchList1, matchList2 } = responseContext

  useEffect(() => {
    loadUpcomingMatches('API_KEY_2')
    console.log('loading matches')
  }, [])

  return (
    <div>
      <Row>
        <Col>
          {matchList1 ? (
            <div>
              {matchList1.map((match) => (
                <Card style={{ height: 150 }} key={match.unique_id}>
                  <Card.Body>
                    <Card.Title>
                      {match['team-1']} v {match['team-2']}
                    </Card.Title>
                    <Card.Text>
                      Date: {match.dateTimeGMT}
                      <br />
                      Match ID: {match.unique_id}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <h1>Loading Matches...</h1>
            </div>
          )}
        </Col>
        <Col>
          {matchList2 ? (
            <div>
              {matchList2.map((match) => (
                <Card style={{ height: 150 }} key={match.unique_id}>
                  <Card.Body>
                    <Card.Title>
                      {match['team-1']} v {match['team-2']}
                    </Card.Title>
                    <Card.Text>
                      Date: {match.dateTimeGMT}
                      <br />
                      Match ID: {match.unique_id}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <h1>Loading Matches...</h1>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default MatchList
