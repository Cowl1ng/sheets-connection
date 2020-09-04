import { GET_MATCH_STATS, MATCHES_LOADED } from './types'

export default (state, action) => {
  switch (action.type) {
    case MATCHES_LOADED:
      return {
        ...state,
        matches: action.payload.matches,
        matchList1: action.payload.matchList1,
        matchList2: action.payload.matchList2,
      }
    case GET_MATCH_STATS:
      return {
        ...state,
        match: action.payload,
      }
    default:
      return state
  }
}
