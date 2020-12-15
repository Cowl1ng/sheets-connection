const matchStats = require('./sportsmonk_response.json')
// const  matchStats = res.data


const localteamID = 51


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
    var index = teamSheet1.map(obj => obj[0]).indexOf(batter.catch_stump_player_id)
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
    var index = teamSheet2.map(obj => obj[0]).indexOf(batter.catch_stump_player_id)
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

console.log(`BaST1: ${JSON.stringify(battingStatsTeam1)}`)
console.log(`BaST2: ${JSON.stringify(battingStatsTeam2)}`)
console.log(`BoST1: ${JSON.stringify(bowlingStatsTeam1)}`)
console.log(`BoST2: ${JSON.stringify(bowlingStatsTeam2)}`)
console.log(`FST1: ${JSON.stringify(fieldingStatsTeam1)}`)
console.log(`FST2: ${JSON.stringify(fieldingStatsTeam2)}`)
console.log(`TS1: ${JSON.stringify(teamSheet1)}`)
console.log(`TS2: ${JSON.stringify(teamSheet2)}`)
console.log(`TS2: ${JSON.stringify(teamSheet2[3][1])}`)
