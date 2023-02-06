import store2 from 'store2';

import { Locale } from 'ltypes';

const CONFIG_ID = 'config-id';
const DEVICE_ID = 'device-id';
const GAME_TOKEN = 'game-token';
const HAS_VISITED = 'has-visited';
const LOCALE = 'locale';
const USERNAME = 'username';

const store = store2.namespace('lexatious');

const localStorage = {
  getConfigId(): string | undefined {
    return store.get(CONFIG_ID);
  },

  setConfigId(configId: string | undefined): void {
    store.set(CONFIG_ID, configId, true);
  },

  getDeviceID(): string | undefined {
    return store.get(DEVICE_ID);
  },

  setDeviceID(deviceID: string | undefined): void {
    store.set(DEVICE_ID, deviceID, true);
  },

  getGameToken(): string | undefined {
    return store.get(GAME_TOKEN);
  },

  setGameToken(gameToken: string | undefined): void {
    store.set(GAME_TOKEN, gameToken, true);
  },

  getHasVisited(): boolean {
    return Boolean(store.get(HAS_VISITED));
  },

  setHasVisited(hasVisited: boolean): void {
    store.set(HAS_VISITED, hasVisited, true);
  },

  getLocale(): Locale | undefined {
    return store.get(LOCALE);
  },

  setLocale(locale: Locale | undefined): void {
    store.set(LOCALE, locale, true);
  },

  getUsername(): string | undefined {
    return store.get(USERNAME);
  },

  setUsername(username: string | undefined): void {
    store.set(USERNAME, username, true);
  },

};

export default localStorage;
