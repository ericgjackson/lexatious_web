import { getLocaleConfig } from 'configs';
import { Rack } from 'ltypes';

import settingsInitialState from './settingsInitialState';

const { configId, locale } = settingsInitialState;
const { maximumCharactersCount } = getLocaleConfig(configId, locale);
const rackInitialState: Rack = Rack.create(maximumCharactersCount);

export default rackInitialState;
