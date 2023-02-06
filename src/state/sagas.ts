/* eslint-disable max-lines */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import { ChangesJson, Placement } from 'ltypes';
import {
  concede,
  exchange,
  getAchievements,
  getFriends,
  getState,
  getStats,
  getUpdate,
  getUserData,
  newGame,
  play,
  register,
} from 'sdk';

import { initialize, reset } from './actions';
import localStorage from './localStorage';
import {
  selectDeviceID,
  selectGameToken,
  selectPlacements,
  selectPlayer,
  selectRack,
  selectSequenceIndex,
  selectUsername,
} from './selectors';
import {
  achievementsSlice,
  activePlayerSlice,
  boardSlice,
  concedeSlice,
  deviceIDSlice,
  errorMessageSlice,
  exchangeSlice,
  friendsSlice,
  gameTokenSlice,
  getAchievementsSlice,
  getFriendsSlice,
  getStateSlice,
  getStatisticsSlice,
  getUpdateSlice,
  getUserDataSlice,
  invalidCellsSlice,
  invalidSlice,
  invitationsSlice,
  lastActionSlice,
  lastChangesSlice,
  newGameSlice,
  opponentNameSlice,
  placementsSlice,
  playSlice,
  playerSlice,
  rackSlice,
  registerSlice,
  registrationMessageSlice,
  sequenceIndexSlice,
  statisticsSlice,
  usernameSlice,
  winnerSlice,
} from './slices';

// Can't conveniently type generators for sagas yet,
// see: https://github.com/microsoft/TypeScript/issues/43632
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyGenerator = Generator<any, any, any>;

export function* rootSaga(): AnyGenerator {
  yield takeLatest(initialize.type, onInitialize);
  yield takeLatest(reset.type, onReset);

  yield takeLatest(concedeSlice.actions.submit.type, onConcede);
  yield takeLatest(exchangeSlice.actions.submit.type, onExchange);
  yield takeLatest(getAchievementsSlice.actions.submit.type, onGetAchievements);
  yield takeLatest(getFriendsSlice.actions.submit.type, onGetFriends);
  yield takeLatest(getStateSlice.actions.submit.type, onGetState);
  yield takeLatest(getStatisticsSlice.actions.submit.type, onGetStatistics);
  yield takeLatest(getUpdateSlice.actions.submit.type, onGetUpdate);
  yield takeLatest(getUserDataSlice.actions.submit.type, onGetUserData);
  yield takeLatest(newGameSlice.actions.submit.type, onNewGame);
  yield takeLatest(playSlice.actions.submit.type, onPlay);
  yield takeLatest(registerSlice.actions.submit.type, onRegister);
}

function* onReset(): AnyGenerator {
  yield put(boardSlice.actions.reset());
  yield put(rackSlice.actions.reset());
}

interface NewGameResponse {
  active_player: number;
  error_msg?: string;
  game_token: string;
  player: number;
  rack: string;
  sequence_index: number;
}

function* newGameResults(results: NewGameResponse, opponentName: string): AnyGenerator {
  try {
    const errorMsg = results.error_msg;
    if (errorMsg) {
      yield put(errorMessageSlice.actions.set(errorMsg));
      return;
    }
    yield put(errorMessageSlice.actions.reset());
    localStorage.setGameToken(results.game_token);
    yield put(boardSlice.actions.reset());
    yield put(rackSlice.actions.setUnselected(results.rack.split('')));
    yield put(playerSlice.actions.set(results.player));
    yield put(activePlayerSlice.actions.set(results.active_player));
    yield put(winnerSlice.actions.reset());
    yield put(gameTokenSlice.actions.set(results.game_token));
    yield put(invalidCellsSlice.actions.reset());
    yield put(invalidSlice.actions.reset());
    yield put(lastActionSlice.actions.reset());
    yield put(opponentNameSlice.actions.set(opponentName));
    yield put(newGameSlice.actions.submitSuccess());
  } catch (error) {
    yield put(newGameSlice.actions.submitFailure(error));
  }
}

function* onNewGame({ payload }: PayloadAction<{ opponentName: string, opponentGoesFirst: boolean }>): AnyGenerator {
  const { opponentName, opponentGoesFirst } = payload;
  const deviceID = yield select(selectDeviceID);
  const username = yield select(selectUsername);
  try {
    const results = yield call(newGame, { deviceID, opponentGoesFirst, opponentName, username });
    yield newGameResults(results, opponentName);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(newGameSlice.actions.submitFailure(error));
    }
  }
}

interface RegisterResponse {
  error_msg?: string;
}

function* registerResults(results: RegisterResponse, username: string): AnyGenerator {
  try {
    const errorMsg = results.error_msg;
    if (errorMsg) {
      yield put(registrationMessageSlice.actions.set(errorMsg));
      return;
    }
    yield put(errorMessageSlice.actions.reset());
    localStorage.setUsername(username);
    yield put(usernameSlice.actions.set(username));
    yield put(registrationMessageSlice.actions.set(`Username "${username}" set`));
    yield put(registerSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(registerSlice.actions.submitFailure(error));
    }
  }
}

function* onRegister({ payload }: PayloadAction<{ username: string }>): AnyGenerator {
  const { username } = payload;
  const deviceID = yield select(selectDeviceID);
  try {
    const results = yield call(register, { deviceID, username });
    yield registerResults(results, username);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(registerSlice.actions.submitFailure(error));
    }
  }
}

interface PlayResponse {
  active_player: number;
  error_msg?: string;
  invalid?: boolean;
  invalid_cells?: number[];
  letters: string;
  occupiers: string;
  rack: string;
  sequence_index: number;
  winner: number;
}

/* eslint-disable-next-line max-statements */
function* playResults(results: PlayResponse): AnyGenerator {
  try {
    const errorMsg = results.error_msg;
    if (errorMsg) {
      yield put(errorMessageSlice.actions.set(errorMsg));
      yield put(invalidSlice.actions.reset());
      return;
    }
    yield put(errorMessageSlice.actions.reset());
    if (results.invalid) {
      yield put(invalidSlice.actions.set(true));
      if (results.invalid_cells) {
        yield put(invalidCellsSlice.actions.set(results.invalid_cells));
      }
      return;
    }
    yield put(invalidSlice.actions.reset());
    yield put(activePlayerSlice.actions.set(results.active_player));
    yield put(boardSlice.actions.set({ letters: results.letters, occupiers: results.occupiers }));
    yield put(rackSlice.actions.setUnselected(results.rack.split('')));
    yield put(sequenceIndexSlice.actions.set(results.sequence_index));
    yield put(lastChangesSlice.actions.reset());
    yield put(placementsSlice.actions.reset());
    yield put(winnerSlice.actions.set(results.winner));
    yield put(lastActionSlice.actions.reset());
    yield put(playSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(playSlice.actions.submitFailure(error));
    }
  }
}

function* onPlay(): AnyGenerator {
  const player = yield select(selectPlayer);
  const placements = yield select(selectPlacements);
  const changes: ChangesJson = placements.map((p: Placement) => {
    return ({ letter: p.character, row: p.y, col: p.x });
  });
  const gameToken = yield select(selectGameToken);
  const expectedSequenceIndex = yield select(selectSequenceIndex);

  try {
    const results = yield call(play, {
      changes,
      draw: true,
      expectedSequenceIndex,
      gameToken,
      player,
    });
    yield playResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(playSlice.actions.submitFailure(error));
    }
  }
}

interface ConcedeResponse {
  sequence_index: number;
}

function* concedeResults(results: ConcedeResponse, player: number): AnyGenerator {
  try {
    yield put(sequenceIndexSlice.actions.set(results.sequence_index));
    yield put(winnerSlice.actions.set(1 - player));
    yield put(errorMessageSlice.actions.reset());
    yield put(invalidSlice.actions.reset());
    yield put(lastActionSlice.actions.reset());
    yield put(concedeSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(concedeSlice.actions.submitFailure(error));
    }
  }
}

function* onConcede(): AnyGenerator {
  const gameToken = yield select(selectGameToken);
  const player = yield select(selectPlayer);
  const expectedSequenceIndex = yield select(selectSequenceIndex);
  try {
    const results = yield call(concede, {
      expectedSequenceIndex,
      gameToken,
      player,
    });
    yield concedeResults(results, player);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(concedeSlice.actions.submitFailure(error));
    }
  }
}

interface ExchangeResponse {
  active_player: number;
  letters: string;
  sequence_index: number;
  winner: number;
}

function* exchangeResults(results: ExchangeResponse): AnyGenerator {
  try {
    yield put(activePlayerSlice.actions.set(results.active_player));
    yield put(rackSlice.actions.setUnselected(results.letters.split('')));
    yield put(sequenceIndexSlice.actions.set(results.sequence_index));
    yield put(placementsSlice.actions.reset());
    yield put(winnerSlice.actions.set(results.winner));
    yield put(errorMessageSlice.actions.reset());
    yield put(invalidSlice.actions.reset());
    yield put(lastActionSlice.actions.reset());
    yield put(exchangeSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(exchangeSlice.actions.submitFailure(error));
    }
  }
}

function* onExchange(): AnyGenerator {
  const rack = yield select(selectRack);
  const toExchange = rack.selectedLetters();
  if (!toExchange) {
    yield put(errorMessageSlice.actions.set('Select letters on the rack, then click Exchange'));
    return;
  }
  const gameToken = yield select(selectGameToken);
  const player = yield select(selectPlayer);
  const expectedSequenceIndex = yield select(selectSequenceIndex);

  try {
    const results = yield call(exchange, {
      expectedSequenceIndex,
      gameToken,
      letters: toExchange,
      player,
    });
    yield exchangeResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(exchangeSlice.actions.submitFailure(error));
    }
  }
}

interface GetUpdateResponse {
  active_player: number;
  last_action: string;
  last_changes: number[];
  letters: string;
  occupiers: string;
  sequence_index: number;
  winner: number;
}

function* getUpdateResults(results: GetUpdateResponse): AnyGenerator {
  try {
    if (Object.keys(results).length === 0) {
      yield put(getUpdateSlice.actions.submitSuccess());
      return;
    }
    yield put(activePlayerSlice.actions.set(results.active_player));
    yield put(boardSlice.actions.set({ letters: results.letters, occupiers: results.occupiers }));
    yield put(sequenceIndexSlice.actions.set(results.sequence_index));
    yield put(lastActionSlice.actions.set(results.last_action));
    yield put(lastChangesSlice.actions.init(results.last_changes));
    yield put(winnerSlice.actions.set(results.winner));
    yield put(errorMessageSlice.actions.reset());
    yield put(invalidSlice.actions.reset());
    yield put(getUpdateSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUpdateSlice.actions.submitFailure(error));
    }
  }
}

function* onGetUpdate(): AnyGenerator {
  const gameToken = yield select(selectGameToken);
  const player = yield select(selectPlayer);

  try {
    const results = yield call(getUpdate, {
      gameToken,
      player,
    });
    yield getUpdateResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getUpdateSlice.actions.submitFailure(error));
    }
  }
}

interface Friend {
  username: string;
  device_id: string;
}

interface GetFriendsResponse {
  friends: Friend[];
}

function* getFriendsResults(results: GetFriendsResponse): AnyGenerator {
  try {
    yield put(friendsSlice.actions.init(results.friends));
    yield put(getFriendsSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getFriendsSlice.actions.submitFailure(error));
    }
  }
}

function* onGetFriends(): AnyGenerator {
  const deviceID = yield select(selectDeviceID);
  try {
    const results = yield call(getFriends, { deviceID });
    yield getFriendsResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getFriendsSlice.actions.submitFailure(error));
    }
  }
}

interface Game {
  accepted: boolean;
  active_player: number;
  initiator?: number;
  opp_username: string;
  player: number;
  token: string;
  winner: number;
}

interface GetUserDataResponse {
  games: Game[];
}

function* getUserDataResults(results: GetUserDataResponse): AnyGenerator {
  try {
    yield put(invitationsSlice.actions.set(results.games));
    yield put(getUserDataSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUserDataSlice.actions.submitFailure(error));
    }
  }
}

function* onGetUserData(): AnyGenerator {
  const deviceID = yield select(selectDeviceID);
  const username = yield select(selectUsername);
  try {
    const results = yield call(getUserData, { deviceID, username });
    yield getUserDataResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getUserDataSlice.actions.submitFailure(error));
    }
  }
}

interface GetStateResponse {
  active_player: number;
  conceder: number;
  last_action: string;
  last_changes: number[];
  letters: string;
  occupiers: string;
  opp_username: string;
  player: number,
  rack: string;
  sequence_index: number;
  winner: number;
}

function* getStateResults(results: GetStateResponse, gameToken: string): AnyGenerator {
  try {
    yield put(activePlayerSlice.actions.set(results.active_player));
    yield put(boardSlice.actions.set({ letters: results.letters, occupiers: results.occupiers }));
    yield put(lastActionSlice.actions.set(results.last_action));
    yield put(lastChangesSlice.actions.init(results.last_changes));
    yield put(opponentNameSlice.actions.set(results.opp_username));
    yield put(playerSlice.actions.set(results.player));
    yield put(rackSlice.actions.setUnselected(results.rack.split('')));
    yield put(sequenceIndexSlice.actions.set(results.sequence_index));
    yield put(winnerSlice.actions.set(results.winner));
    yield put(errorMessageSlice.actions.reset());
    yield put(invalidSlice.actions.reset());
    localStorage.setGameToken(gameToken);
    yield put(gameTokenSlice.actions.set(gameToken));
    yield put(getStateSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getStateSlice.actions.submitFailure(error));
    }
  }
}

function* onGetState({ payload }: PayloadAction<{ gameToken: string }>): AnyGenerator {
  const { gameToken } = payload;
  const deviceID = yield select(selectDeviceID);
  const username = yield select(selectUsername);
  try {
    const results = yield call(getState, { deviceID, gameToken, username });
    yield getStateResults(results, gameToken);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getStateSlice.actions.submitFailure(error));
    }
  }
}

function* onInitialize(): AnyGenerator {
  const gameToken = localStorage.getGameToken();
  yield put(gameTokenSlice.actions.set(gameToken || ''));
  const savedDeviceID = localStorage.getDeviceID();
  const deviceID = savedDeviceID ? savedDeviceID : uuidv4();
  if (!savedDeviceID) {
    localStorage.setDeviceID(deviceID);
  }
  yield put(deviceIDSlice.actions.set(deviceID || ''));
  const username = localStorage.getUsername();
  yield put(usernameSlice.actions.set(username || ''));
  if (!gameToken) {
    return;
  }
  try {
    const results = yield call(getState, { deviceID, gameToken, username });
    yield getStateResults(results, gameToken);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getStateSlice.actions.submitFailure(error));
    }
  }
}

interface SingleOpponentStats {
  opponent: string;
  wins: number;
  losses: number;
}

interface getStatisticsResponse {
  opp_stats: SingleOpponentStats[];
}

function* getStatisticsResults(results: getStatisticsResponse): AnyGenerator {
  try {
    yield put(statisticsSlice.actions.init(results.opp_stats));
    yield put(getStatisticsSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getStatisticsSlice.actions.submitFailure(error));
    }
  }
}

function* onGetStatistics(): AnyGenerator {
  const deviceID = yield select(selectDeviceID);
  try {
    const results = yield call(getStats, { deviceID });
    yield getStatisticsResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getStatisticsSlice.actions.submitFailure(error));
    }
  }
}

interface Achievement {
  title: string;
  description: string;
  achieved: boolean;
}

interface GetAchievementsResponse {
  achievements: Achievement[];
}

function* getAchievementsResults(results: GetAchievementsResponse): AnyGenerator {
  try {
    yield put(achievementsSlice.actions.init(results.achievements));
    yield put(getAchievementsSlice.actions.submitSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAchievementsSlice.actions.submitFailure(error));
    }
  }
}

function* onGetAchievements(): AnyGenerator {
  const deviceID = yield select(selectDeviceID);
  try {
    const results = yield call(getAchievements, { deviceID });
    yield getAchievementsResults(results);
  } catch (error) {
    if (error instanceof Error) {
      error.name = '';
      yield put(errorMessageSlice.actions.set(error.toString()));
      yield put(getAchievementsSlice.actions.submitFailure(error));
    }
  }
}
