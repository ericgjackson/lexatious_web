import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  accepted: boolean;
  active_player: number;
  initiator?: number;
  opp_username: string;
  player: number;
  token: string;
  winner: number;
}

interface Invitation {
  active_player: number;
  opp_username: string;
  player: number;
  token: string;
}

const invitationsInitialState: Invitation[] = [];

const invitationsSlice = createSlice({
  initialState: invitationsInitialState,
  name: 'invitations',
  reducers: {
    init: (_state, action: PayloadAction<Invitation[]>) => {
      return action.payload;
    },

    set: (_state, action: PayloadAction<Game []>) => {
      return action.payload.filter((g) => !g.accepted).map((g) => {
        return ({
          /* eslint-disable-next-line camelcase */
          active_player: g.active_player,
          /* eslint-disable-next-line camelcase */
          opp_username: g.opp_username,
          player: g.player,
          token: g.token,
        });
      });
    },

    reset: () => invitationsInitialState,
  },
});

export default invitationsSlice;
