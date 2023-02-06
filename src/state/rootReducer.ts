import { combineReducers } from 'redux';

import {
  achievementsSlice,
  activePlayerSlice,
  boardSlice,
  deviceIDSlice,
  errorMessageSlice,
  friendsSlice,
  gameTokenSlice,
  invalidCellsSlice,
  invalidSlice,
  invitationsSlice,
  lastActionSlice,
  lastChangesSlice,
  opponentNameSlice,
  placementsSlice,
  playerSlice,
  rackSlice,
  registrationMessageSlice,
  sequenceIndexSlice,
  settingsSlice,
  statisticsSlice,
  usernameSlice,
  winnerSlice,
} from './slices';

const rootReducer = combineReducers({
  achievements: achievementsSlice.reducer,
  activePlayer: activePlayerSlice.reducer,
  board: boardSlice.reducer,
  deviceID: deviceIDSlice.reducer,
  errorMessage: errorMessageSlice.reducer,
  friends: friendsSlice.reducer,
  gameToken: gameTokenSlice.reducer,
  invalidCells: invalidCellsSlice.reducer,
  invalid: invalidSlice.reducer,
  invitations: invitationsSlice.reducer,
  lastAction: lastActionSlice.reducer,
  lastChanges: lastChangesSlice.reducer,
  opponentName: opponentNameSlice.reducer,
  placements: placementsSlice.reducer,
  player: playerSlice.reducer,
  rack: rackSlice.reducer,
  registrationMessage: registrationMessageSlice.reducer,
  sequenceIndex: sequenceIndexSlice.reducer,
  settings: settingsSlice.reducer,
  statistics: statisticsSlice.reducer,
  username: usernameSlice.reducer,
  winner: winnerSlice.reducer,
});

export default rootReducer;
