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
  const orderStats = async () => {
    console.log(fantasySummary)
    console.log(`Orderin`)
    if (state.match) {
      const matchStats = state.match.data
      // // Example of matchInfo needed for spreadsheets API
      // const matchInfo = [
      //   { Name: 'Jonathon Cook', PlayerID: 1137279, RunsBatting: '40', Balls: '25' },
      //   { Name: 'Chris Tremain', PlayerID: 553800, RunsBatting: '20', Balls: '5' },
      // ]

      const battingStatsTeam1 = []
      // pid,6s, balls, 4s, runs
      const bowlingStatsTeam1 = []
      // pid, Zeros, W, R, M, O
      const fieldingStatsTeam1 = []
      // pid, RO, S, Lbw, C

      const battingStatsTeam2 = []
      const bowlingStatsTeam2 = []
      const fieldingStatsTeam2 = []

      const teamSheet1 = []
      const teamSheet2 = []

      const matchInfo = []

      matchStats.team[0].players.forEach((player) =>
        teamSheet1.push([player.name, player.pid])
      )
      matchStats.team[1].players.forEach((player) =>
        teamSheet2.push([player.name, player.pid])
      )
      // Batting Stats
      // pid, 6s, 4s, balls, runs
      matchStats.batting[0].scores.forEach((player) =>
        battingStatsTeam1.push([
          player.pid,
          player['6s'],
          player['4s'],
          player['B'],
          player['R'],
        ])
      )
      matchStats.batting[1].scores.forEach((player) =>
        battingStatsTeam2.push([
          player.pid,
          player['6s'],
          player['4s'],
          player['B'],
          player['R'],
        ])
      )
      // Bowling stats
      // pid, Zeros, W, R, M, O
      matchStats.bowling[1].scores.forEach((player) =>
        bowlingStatsTeam1.push([
          player.pid,
          player['0s'],
          player.W,
          player.R,
          player.M,
          player.O,
        ])
      )
      matchStats.bowling[0].scores.forEach((player) =>
        bowlingStatsTeam2.push([
          player.pid,
          player['0s'],
          player.W,
          player.R,
          player.M,
          player.O,
        ])
      )
      // pid, RO, S, Lbw, C
      matchStats.fielding[1].scores.forEach((player) =>
        fieldingStatsTeam1.push([
          player.pid,
          player['runout'],
          player['stumped'],
          player['lbw'],
          player['catch'],
        ])
      )
      matchStats.fielding[0].scores.forEach((player) =>
        fieldingStatsTeam2.push([
          player.pid,
          player['runout'],
          player['stumped'],
          player['lbw'],
          player['catch'],
        ])
      )

      // Combining stats
      teamSheet1.forEach((player) => {})

      console.log(`ST1: ${JSON.stringify(teamSheet1)}`)
      console.log(`ST2: ${JSON.stringify(fieldingStatsTeam2)}`)
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
        orderStats,
      }}
    >
      {props.children}
    </ResponseContext.Provider>
  )
}

export default ResponseState
