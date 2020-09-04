import React, { useReducer } from 'react'
import Axios from 'axios'

import fantasySummary from '../fantasySummary.json'

import ResponseContext from './responseContext'
import ResponseReducer from './responseReducer'

import { GET_MATCH_STATS, MATCHES_LOADED } from './types'

const ResponseState = (props) => {
  const initialState = {
    match: null,
    matches: null,
    matchList1: null,
    matchList2: null,
  }

  const [state, dispatch] = useReducer(ResponseReducer, initialState)

  // Load next matches
  const loadUpcomingMatches = async (apiKey) => {
    const matchList1 = []
    const matchList2 = []
    const res = await Axios.get(`/api?apiKey=${apiKey}`)
    const matches = res.data.data.slice(0, 10)
    for (var i = 0; i < matches.length; i++) {
      if (i % 2 === 0) {
        matchList1.push(matches[i])
      } else {
        matchList2.push(matches[i])
      }
    }
    const payload = {
      matches,
      matchList1,
      matchList2,
    }
    dispatch({ type: MATCHES_LOADED, payload })
  }

  // Submit match ID
  const getMatchStats = async (matchID, apiKey) => {
    dispatch({ type: GET_MATCH_STATS, payload: fantasySummary })
  }

  //Ordering match stats
  const orderStats = async (match) => {
    const matchStats = state.match.data

    const battingStatsTeam1 = state.match.data.batting[0]
    const bowlingStatsTeam1 = state.match.data.bowling[1]
    const fieldingStatsTeam1 = state.match.data.fielding[1]

    const battingStatsTeam2 = state.match.data.batting[1]
    const bowlingStatsTeam2 = state.match.data.bowling[0]
    const fieldingStatsTeam2 = state.match.data.fielding[0]

    const statsTeam1 = []
    const statsTeam2 = []
    {
      match.data.batting.map((team) =>
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
      )
    }
  }

  return (
    <ResponseContext.Provider
      value={{
        matches: state.matches,
        match: state.match,
        matchList1: state.matchList1,
        matchList2: state.matchList2,
        loadUpcomingMatches,
        getMatchStats,
      }}
    >
      {props.children}
    </ResponseContext.Provider>
  )
}

export default ResponseState
