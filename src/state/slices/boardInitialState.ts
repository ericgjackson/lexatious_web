import { getLocaleConfig } from 'configs';
import { Board } from 'ltypes';

import settingsInitialState from './settingsInitialState';

const { configId, locale } = settingsInitialState;
const { boardHeight, boardWidth } = getLocaleConfig(configId, locale);
const boardInitialState: Board = Board.create(boardWidth, boardHeight);

export default boardInitialState;
