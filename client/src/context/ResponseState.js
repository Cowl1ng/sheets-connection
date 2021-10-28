import React, { useReducer } from 'react'
import Axios from 'axios'

import ResponseContext from './responseContext'
import ResponseReducer from './responseReducer'


// Example api responses for testing
import fantasySummary from '../fantasySummary.json'
import fantasySummary_1team from '../fantasySum_1team.json'
import cricketScore from '../fantasySco_1team.json'

import { GET_MATCH_STATS, MATCHES_LOADED } from './types'

const { GoogleSpreadsheet } = require('google-spreadsheet')
// Spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet(
//   '1gHTeqFudAPL7GOKToSVTyuwHqdkXBQOl1NzlYCVnk3c'
// )
const doc = new GoogleSpreadsheet(
  '1abJMknU7wzkRkHO5EKshE056RwTt8E1h0nvUjikAao4'
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
  } catch (error) {
    console.error(error)
  }
}

const createSheet = async (matchID, headers, matchInfo) => {
  try {
    const newSheet = await doc.addSheet({
      title: `${matchID}`,
      headerValues: headers,
    })
    const newRows = await newSheet.addRows(matchInfo)
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
    matchScore: null,
    matches: null,
    matchList1: null,
    matchList2: null,
    matchID: null,
  }

  const [state, dispatch] = useReducer(ResponseReducer, initialState)

  // Load next matches
  const loadUpcomingMatches = async (apiKey) => {
    const matchList1 = []
    const matchList2 = []
    console.log(apiKey)
    const res = await Axios.get(`/api?apiKey=${apiKey}`)
    const matches = res.data.matches.filter(
      (match) => match.type === 'Twenty20'
    )
    // const matches = res.data.matchList.matches
    matches.forEach(
      (match) =>
        (match.dateTimeGMT = match.dateTimeGMT
          .replace('T', ' ')
          .replace('Z', 'GMT'))
    )

    const currentDate = Date.now()
    const datedMatches = matches.filter(
      (match) => Date.parse(match.dateTimeGMT) > currentDate
    )
    // const sliceNumber = datedMatches.length - 10
    const nextMatches = datedMatches.slice(0, 10)
    for (var i = 0; i < nextMatches.length; i++) {
      if (i % 2 === 0) {
        matchList1.push(nextMatches[i])
      } else {
        matchList2.push(nextMatches[i])
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
    const res = await Axios.get(
      `/api/stats?apiKey=${apiKey}&matchID=${matchID}`
    )
    // // Testing
    // const res = fantasySummary_1team
    // const res2 = cricketScore
    // console.log(`RES: ${JSON.stringify(res.data)}`)
    dispatch({
      type: GET_MATCH_STATS,
      payload: {
        matchStats: res.data.matchStats,
        matchScore: res.data.matchScore,
        matchID: matchID,
      },
      // // Payload for testing
      // payload: {
      //   matchStats: res,
      //   matchScore: res2,
      //   matchID: matchID,
      // },
    })
  }

  //Ordering match stats
  const orderStats = async () => {
    if (state.match) {
      const matchID = state.matchID
      const matchStats = state.match.data
      const matchScore = state.matchScore
      
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
      const player23 = new playerInfo(matchID, 'P23')
      const player24 = new playerInfo(matchID, 'P24')
      const player25 = new playerInfo(matchID, 'P25')
      const player26 = new playerInfo(matchID, 'P26')
      const player27 = new playerInfo(matchID, 'P27')
      const player28 = new playerInfo(matchID, 'P28')

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
        player23,
        player24,
        player25,
        player26,
        player27,
        player28
      ]

      // Add players to teamsheets
        const localteamID = matchStats.localteam.id
        const visitorteamID = matchStats.visitorteam.id

        matchStats.lineup.forEach((player) => {
          if (player.lineup.team_id === localteamID) {
            teamSheet1.push([player.id, player.fullname])
          } else {
            teamSheet2.push([player.id, player.fullname])
          }
        
        }
        )

// Batting Stats
// pid, 6s, 4s, balls, runs
if(matchStats.batting !== '[]') {
  matchStats.batting.forEach(batter => {
    if(batter.team_id === localteamID) {
      battingStatsTeam1.push([batter.player_id, batter.six_x, batter.four_x, batter.ball, batter.score])
    } else {
      battingStatsTeam2.push([batter.player_id, batter.six_x, batter.four_x, batter.ball, batter.score])
    }
  })
  // Fielding stats
  // pid, RO, S, Lbw, C
  // Initialise fielding stats by lineup
  teamSheet1.forEach(player => {
    fieldingStatsTeam1.push([player[0], 0, 0, 0, 0])
  })
  
  teamSheet2.forEach(player => {
    fieldingStatsTeam2.push([player[0], 0, 0, 0, 0])
  })
  
  matchStats.batting.forEach(batter => {
    if(batter.team_id !== localteamID) {
      var index = teamSheet1.map(player => player[0]).indexOf(batter.catch_stump_player_id)
      // Runout score_id: 63
      if(index !== -1) {
        if(batter.score_id === 63)  {
          fieldingStatsTeam1[index][1] ++
        } 
        // Stumpings score_id: 56 
        else if(batter.score_id === 56) {
          fieldingStatsTeam1[index][2] ++
        } 
        // LBW score_id: 83 
        
        else if(batter.score_id === 83) {
          fieldingStatsTeam1[index][3] ++
        } 
        // Catch score_id: 54 
        else if(batter.score_id === 54) {
          fieldingStatsTeam1[index][4] ++
        }
      }
    } else {
      var index = teamSheet2.map(player => player[0]).indexOf(batter.catch_stump_player_id)
      if(index !== -1) {
        // Runout score_id: 63
        if(batter.score_id === 63)  {
          fieldingStatsTeam2[index][1] ++
        } 
        // Stumpings score_id: 56 
        else if(batter.score_id === 56) {
          fieldingStatsTeam2[index][2] ++
        } 
        // LBW score_id: 83 
        else if(batter.score_id === 83) {
          fieldingStatsTeam2[index][3] ++
        } 
        // Catch score_id: 54 
        else if(batter.score_id === 54) {
          fieldingStatsTeam2[index][4] ++
        }
      } 
    }
  })
  
  }
  
  
  //  Bowling stats
  // pid, Dots, W, R, M, O
  if(matchStats.bowling !== '[]') {
    matchStats.bowling.forEach(bowler => {
      if(bowler.team_id === localteamID) {
        bowlingStatsTeam1.push([bowler.player_id, 0, bowler.wickets, bowler.runs, bowler.medians, bowler.overs])
      } else {
        bowlingStatsTeam2.push([bowler.player_id, 0, bowler.wickets, bowler.runs, bowler.medians, bowler.overs])
      }
    })
    }

  // Calculating dot balls
  if(matchStats.balls !== '[]') {
    const scoreIDs = []
    matchStats.balls.forEach(ball => {
      var index1 = scoreIDs.map(element => element[0]).indexOf(ball.score_id)
      if(index1 === -1) {
        scoreIDs.push([ball.score_id, ball.ball])
      }
      if(ball.score_id === 82 || ball.score_id === 83 || ball.score_id === 54 || ball.score_id === 79 || ball.score_id === 55 || ball.score_id === 4 || ball.score_id === 41 || ball.score_id === 1 || ball.score_id === 63) {
      if(ball.team.id !== localteamID) {
        var index = bowlingStatsTeam1.map(player => player[0]).indexOf(ball.bowler_id)
        if(index !== -1) {
          bowlingStatsTeam1[index][1] ++
        }
      } else {
        var index = bowlingStatsTeam2.map(player => player[0]).indexOf(ball.bowler_id)
        if(index !== -1) {         
          bowlingStatsTeam2[index][1] ++
        }
      }
    }})
    console.log(`ScoreIDs: ${scoreIDs}`)
  }
  
      // Combining stats
      // Batting Stats
      // pid, Sixes, Fours, balls, runs
      // Bowling stats
      // pid, Dots, W, R, M, O
      // Fielding stats
      // pid, RO, S, Lbw, C
      // Combined stats
      // PlayerID,	Name,	Runout,	Stumped,	Lbw,	Catch,	Dots,	Wickets,	RunsBowling,	Maidens,	Overs,	Sixes,	Fours,	Balls,	RunsBatting,	MOTM,

      // console.log(`BaST1: ${JSON.stringify(battingStatsTeam1)}`)
      // console.log(`BaST2: ${JSON.stringify(battingStatsTeam2)}`)
      // console.log(`BoST1: ${JSON.stringify(bowlingStatsTeam1)}`)
      // console.log(`BoST2: ${JSON.stringify(bowlingStatsTeam2)}`)
      // console.log(`FST1: ${JSON.stringify(fieldingStatsTeam1)}`)
      // console.log(`FST2: ${JSON.stringify(fieldingStatsTeam2)}`)
      // console.log(`TS1: ${JSON.stringify(teamSheet1)}`)
      // console.log(`TS2: ${JSON.stringify(teamSheet2)}`)

      // // Replacing null values with 0
      // bowlingStatsTeam1.forEach((bowler) => {
      //   for(var i = 0; i < bowler.length; i++) {
      //     if(bowler[i] == null) {
      //       bowler[i] = 0
      //     }
      //   }
      // })
      // bowlingStatsTeam2.forEach((bowler) => {
      //   for(var i = 0; i < bowler.length; i++) {
      //     if(bowler[i] == null) {
      //       bowler[i] = 0
      //     }
      //   }
      // })

      var index = 0
      teamSheet1.forEach((player) => {
        matchInfo[index].Name = player[1]
        matchInfo[index].PlayerID = player[0]
        battingStatsTeam1.forEach((batter) => {
          if (batter[0] === player[0]) {
            matchInfo[index].Sixes = batter[1]
            matchInfo[index].Fours = batter[2]
            matchInfo[index].Balls = batter[3]
            matchInfo[index].RunsBatting = batter[4]
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
        if (player[0] === matchStats.man_of_match_id) {
          matchInfo[index].MotM = 1
        }
        index++
      })
      console.log(matchInfo)
      teamSheet2.forEach((player) => {
        console.log(`Name: ${player[0]}`)
        console.log(`In: ${index}`)
        
        matchInfo[index].Name = player[1]
        matchInfo[index].PlayerID = player[0]
        console.log(`MI: ${JSON.stringify(matchInfo[index])}`)
        battingStatsTeam2.forEach((batter) => {
          if (batter[0] === player[0]) {
            matchInfo[index].Sixes = batter[1]
            matchInfo[index].Fours = batter[2]
            matchInfo[index].Balls = batter[3]
            matchInfo[index].RunsBatting = batter[4]
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

        if (player[0] === matchStats.man_of_match_id) {
          matchInfo[index].MotM = 1
        }
        index++
      })

      // GOOGLESHEETS CONNECTION
      const res = await Axios.get(`/api/key`)
      // Authentication for connecting to sheet
      await doc.useServiceAccountAuth(require('../creds-from-google.json'))
      console.log(`Authenticated sheets`)
      // Loads document properties and worksheets
      await doc.loadInfo()
      console.log(`loaded sheet`)
      const sheets = doc.sheetsByIndex
      // Check if sheet already exists
      var sheetTitles = []
      for (const sheet of sheets) {
        sheetTitles.push(sheet.title)
      }
      const sheetExists = sheetTitles.includes(`${matchID}`)

      // If sheet exists update if not create it
      if (sheetExists) {
        console.log(`Updating sheet`)
        updateSheet(matchID, headers, matchInfo)
      } else {
        console.log(`Creating sheet`)
        createSheet(matchID, headers, matchInfo)
        console.log(`Created sheet`)
      }
    }
  }

  return (
    <ResponseContext.Provider
      value={{
        matches: state.matches,
        match: state.match,
        matchScore: state.matchScore,
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
