import { createSelector } from '@reduxjs/toolkit';

import { getLocaleConfig } from 'configs';
import i18n from 'i18n';
import { Cell, Locale } from 'ltypes';
import { Translations } from 'types';

import { RootState } from './types';

const selectAchievementsRoot = (state: RootState): RootState['achievements'] => state.achievements;

const selectActivePlayerRoot = (state: RootState): RootState['activePlayer'] => state.activePlayer;

const selectBoardRoot = (state: RootState): RootState['board'] => state.board;

const selectDeviceIDRoot = (state: RootState): RootState['deviceID'] => state.deviceID;

const selectErrorMessageRoot = (state: RootState): RootState['errorMessage'] => state.errorMessage;

const selectFriendsRoot = (state: RootState): RootState['friends'] => state.friends;

const selectGameTokenRoot = (state: RootState): RootState['gameToken'] => state.gameToken;

const selectInvalidCellsRoot = (state: RootState): RootState['invalidCells'] => state.invalidCells;

const selectInvalidRoot = (state: RootState): RootState['invalid'] => state.invalid;

const selectInvitationsRoot = (state: RootState): RootState['invitations'] => state.invitations;

const selectLastActionRoot = (state: RootState): RootState['lastAction'] => state.lastAction;

const selectLastChangesRoot = (state: RootState): RootState['lastChanges'] => state.lastChanges;

const selectOpponentNameRoot = (state: RootState): RootState['opponentName'] => state.opponentName;

const selectPlacementsRoot = (state: RootState): RootState['placements'] => state.placements;

const selectPlayerRoot = (state: RootState): RootState['player'] => state.player;

const selectRackRoot = (state: RootState): RootState['rack'] => state.rack;

const selectRegistrationMessageRoot = (state: RootState): RootState['registrationMessage'] => state.registrationMessage;

const selectSequenceIndexRoot = (state: RootState): RootState['sequenceIndex'] => state.sequenceIndex;

const selectSettingsRoot = (state: RootState): RootState['settings'] => state.settings;

const selectStatisticsRoot = (state: RootState): RootState['statistics'] => state.statistics;

const selectUsernameRoot = (state: RootState): RootState['username'] => state.username;

const selectWinnerRoot = (state: RootState): RootState['winner'] => state.winner;

export const selectAutoGroupTiles = createSelector([selectSettingsRoot], (settings) => settings.autoGroupTiles);

export const selectLocale = createSelector([selectSettingsRoot], (settings) => settings.locale);

export const selectBoard = selectBoardRoot;

export const selectConfigId = createSelector([selectSettingsRoot], (settings) => settings.configId);

export const selectConfig = createSelector([selectConfigId, selectLocale], getLocaleConfig);

export const selectRows = createSelector([selectBoardRoot], (board) => {
  return board.rows.map((row: Cell[],) => row.map((cell: Cell,) => cell));
});

export const selectTranslations = createSelector([selectLocale],
  (locale) => i18n[locale as keyof Record<Locale, Translations>]
);

export const selectTranslation = createSelector(
  [selectTranslations, selectLocale, (_: unknown, id: keyof Translations) => id],
  (translations, locale, id): string => {
    const translation = translations[id];

    if (typeof translation === 'undefined') {
      throw new Error(`Untranslated key "${id}" in locale "${locale}"`);
    }

    return translation;
  },
);

export const selectAchievements = selectAchievementsRoot;

export const selectActivePlayer = selectActivePlayerRoot;

export const selectDeviceID = selectDeviceIDRoot;

export const selectErrorMessage = selectErrorMessageRoot;

export const selectFriends = selectFriendsRoot;

export const selectGameToken = selectGameTokenRoot;

export const selectInvalidCells = selectInvalidCellsRoot;

export const selectInvalid = selectInvalidRoot;

export const selectInvitations = selectInvitationsRoot;

export const selectLastAction = selectLastActionRoot;

export const selectLastChanges = selectLastChangesRoot;

export const selectOpponentName = selectOpponentNameRoot;

export const selectPlacements = selectPlacementsRoot;

export const selectPlayer = selectPlayerRoot;

export const selectRack = selectRackRoot;

export const selectRegistrationMessage = selectRegistrationMessageRoot;

export const selectSequenceIndex = selectSequenceIndexRoot;

export const selectStatistics = selectStatisticsRoot;

export const selectUsername = selectUsernameRoot;

export const selectWinner = selectWinnerRoot;
