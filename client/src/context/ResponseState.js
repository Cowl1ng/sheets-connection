import React, { useReducer } from 'react'
import Axios from 'axios'

import fantasySummary from '../fantasySummary.json'

import ResponseContext from './responseContext'
import ResponseReducer from './responseReducer'

import { GET_MATCH_STATS, MATCHES_LOADED } from './types'

const { GoogleSpreadsheet } = require('google-spreadsheet')
// Spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(
  '17oti2EzpzhSPktutTukCRcJyhOKfC7w368OQm5r1Rk0'
)

// Headers for spreadsheet
const headers = [
  'MatchIDPN',
  'PlayerID',
  'Name',
  'Runout',
  'Stumped',
  'Lbw',
  'Catch',
  'Dots',
  'Wickets',
  'RunsBowling',
  'Maidens',
  'Overs',
  'Sixes',
  'Fours',
  'Balls',
  'RunsBatting',
  'MotM',
]

const updateSheet = async (matchID, headers, matchInfo) => {
  const sheet = doc.sheetsByTitle[matchID]
  try {
    // Deleteing sheet then remaking it with new info
    await sheet.delete()
    const newSheet = await doc.addSheet({
      title: `${matchID}`,
      headerValues: headers,
    })
    const newRows = await newSheet.addRows(matchInfo)
    console.log(`Update Sheet`)
  } catch (error) {
    console.error(error)
  }
}

const createSheet = async (matchID, headers, matchInfo) => {
  console.log('Creating new sheet')
  try {
    const newSheet = await doc.addSheet({
      title: `${matchID}`,
      headerValues: headers,
    })
    console.log(`Adding rows`)
    const newRows = await newSheet.addRows(matchInfo)
    console.log(`Created Sheet`)
  } catch (error) {
    console.error(error)
  }
}

class playerInfo {
  constructor(matchID, player_number) {
    this.MatchIDPN = '' + matchID + player_number
    this.PlayerID = null
    this.Name = null
    this.Runout = 0
    this.Stumped = 0
    this.Lbw = 0
    this.Catch = 0
    this.Dots = 0
    this.Wickets = 0
    this.RunsBowling = 0
    this.Maidens = 0
    this.Overs = 0
    this.Sixes = 0
    this.Fours = 0
    this.Balls = 0
    this.RunsBatting = 0
    this.MotM = 0
  }
}

const ResponseState = (props) => {
  const initialState = {
    match: null,
    matches: null,
    matchList1: null,
    matchList2: null,
    matchID: 1195575,
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
    // Need to send matchstats along with matchID
    dispatch({ type: GET_MATCH_STATS, payload: fantasySummary })
  }

  //Ordering match stats
  const orderStats = async () => {
    console.log(fantasySummary)
    console.log(`Orderin`)
    if (state.match) {
      const matchID = state.matchID
      const matchStats = state.match.data

      const teamSheet1 = []
      // pid, name
      const battingStatsTeam1 = []
      // pid, 6s, balls, 4s, runs
      const bowlingStatsTeam1 = []
      // pid, Dots, W, R, M, O
      const fieldingStatsTeam1 = []
      // pid, RO, S, Lbw, C

      const teamSheet2 = []
      const battingStatsTeam2 = []
      const bowlingStatsTeam2 = []
      const fieldingStatsTeam2 = []

      // PlayerID,	Name,	Runout,	Stumped,	Lbw,	Catch,	Dots,	Wickets,	RunsBowling,	Maidens,	Overs,	Sixess,	Fours,	Balls,	RunsBatting,	MOTM,

      const player1 = new playerInfo(matchID, 'P1')
      const player2 = new playerInfo(matchID, 'P2')
      const player3 = new playerInfo(matchID, 'P3')
      const player4 = new playerInfo(matchID, 'P4')
      const player5 = new playerInfo(matchID, 'P5')
      const player6 = new playerInfo(matchID, 'P6')
      const player7 = new playerInfo(matchID, 'P7')
      const player8 = new playerInfo(matchID, 'P8')
      const player9 = new playerInfo(matchID, 'P9')
      const player10 = new playerInfo(matchID, 'P10')
      const player11 = new playerInfo(matchID, 'P11')
      const player12 = new playerInfo(matchID, 'P12')
      const player13 = new playerInfo(matchID, 'P13')
      const player14 = new playerInfo(matchID, 'P14')
      const player15 = new playerInfo(matchID, 'P15')
      const player16 = new playerInfo(matchID, 'P16')
      const player17 = new playerInfo(matchID, 'P17')
      const player18 = new playerInfo(matchID, 'P18')
      const player19 = new playerInfo(matchID, 'P19')
      const player20 = new playerInfo(matchID, 'P20')
      const player21 = new playerInfo(matchID, 'P21')
      const player22 = new playerInfo(matchID, 'P22')

      const matchInfo = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6,
        player7,
        player8,
        player9,
        player10,
        player11,
        player12,
        player13,
        player14,
        player15,
        player16,
        player17,
        player18,
        player19,
        player20,
        player21,
        player22,
      ]

      matchStats.team[0].players.forEach((player) =>
        teamSheet1.push([player.pid, player.name])
      )
      matchStats.team[1].players.forEach((player) =>
        teamSheet2.push([player.pid, player.name])
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
      // pid, Dots, W, R, M, O
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
      // Fielding stats
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
      console.log(`MOTM: ${matchStats['man-of-the-match'].pid}`)
      // Combining stats

      // Batting Stats
      // pid, Sixes, Fours, balls, runs
      // Bowling stats
      // pid, Dots, W, R, M, O
      // Fielding stats
      // pid, RO, S, Lbw, C
      // Combined stats
      // PlayerID,	Name,	Runout,	Stumped,	Lbw,	Catch,	Dots,	Wickets,	RunsBowling,	Maidens,	Overs,	Sixes,	Fours,	Balls,	RunsBatting,	MOTM,
      var index = 0
      teamSheet1.forEach((player) => {
        matchInfo[index].Name = player[1]
        matchInfo[index].PlayerID = player[0]
        battingStatsTeam1.forEach((batter) => {
          if (batter[0] === player[0]) {
            matchInfo[index].Sixes = batter[1]
            matchInfo[index].Fours = batter[2]
            matchInfo[index].Balls = batter[3]
            matchInfo[index].RunsBatted = batter[4]
          }
        })
        bowlingStatsTeam1.forEach((bowler) => {
          if (bowler[0] === player[0]) {
            matchInfo[index].Dots = bowler[1]
            matchInfo[index].Wickets = bowler[2]
            matchInfo[index].RunsBowling = bowler[3]
            matchInfo[index].Maidens = bowler[4]
            matchInfo[index].Overs = bowler[5]
          }
        })
        fieldingStatsTeam1.forEach((fielder) => {
          if (fielder[0] === player[0]) {
            matchInfo[index].Runout = fielder[1]
            matchInfo[index].Stumped = fielder[2]
            matchInfo[index].Lbw = fielder[3]
            matchInfo[index].Catch = fielder[4]
          }
        })
        if (player[0] === matchStats['man-of-the-match'].pid) {
          matchInfo[index].MotM = 1
        }
        index++
      })
      teamSheet2.forEach((player) => {
        matchInfo[index].Name = player[1]
        matchInfo[index].PlayerID = player[0]
        battingStatsTeam2.forEach((batter) => {
          if (batter[0] === player[0]) {
            matchInfo[index].Sixes = batter[1]
            matchInfo[index].Fours = batter[2]
            matchInfo[index].Balls = batter[3]
            matchInfo[index].RunsBatted = batter[4]
          }
        })
        bowlingStatsTeam2.forEach((bowler) => {
          if (bowler[0] === player[0]) {
            matchInfo[index].Dots = bowler[1]
            matchInfo[index].Wickets = bowler[2]
            matchInfo[index].RunsBowling = bowler[3]
            matchInfo[index].Maidens = bowler[4]
            matchInfo[index].Overs = bowler[5]
          }
        })
        fieldingStatsTeam2.forEach((fielder) => {
          if (fielder[0] === player[0]) {
            matchInfo[index].Runout = fielder[1]
            matchInfo[index].Stumped = fielder[2]
            matchInfo[index].Lbw = fielder[3]
            matchInfo[index].Catch = fielder[4]
          }
        })
        if (player.pid === matchStats['man-of-the-match'].pid) {
          matchInfo[index].MotM = 1
        }
        index++
      })
      const res = await Axios.get(`/api/key`)
      console.log(`RES:${JSON.stringify(res)}`)
      // Authentication for connecting to sheet
      await doc.useServiceAccountAuth({
        client_email: res.data.client_email,
        private_key: res.data.private_key,
      })
      console.log('Doc accessed')
      // Loads document properties and worksheets
      await doc.loadInfo()
      console.log('Doc loaded')
      const sheets = doc.sheetsByIndex

      // Check if sheet already exists
      var sheetTitles = []
      for (const sheet of sheets) {
        sheetTitles.push(sheet.title)
      }
      const sheetExists = sheetTitles.includes(`${matchID}`)

      // If sheet exists update if not create it
      if (sheetExists) {
        updateSheet(matchID, headers, matchInfo)
      } else {
        createSheet(matchID, headers, matchInfo)
      }

      console.log(`ST1: ${JSON.stringify(teamSheet1)}`)
      console.log(`ST2: ${JSON.stringify(matchInfo)}`)
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
