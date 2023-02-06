import { Config, Locale } from 'ltypes';

import { tilesEn, tilesEs, tilesFr, tilesPl, tilesDe } from './tiles';

const base = {
  boardHeight: 15,
  boardWidth: 15,
  id: 'scrabble',
  maximumCharactersCount: 7,
  name: 'Scrabble',
};

const scrabble = {
  id: base.id,
  name: base.name,
  [Locale.EN_GB]: Config.fromJson({ ...base, tiles: tilesEn }),
  [Locale.DE_DE]: Config.fromJson({ ...base, tiles: tilesDe }),
  [Locale.EN_US]: Config.fromJson({ ...base, tiles: tilesEn }),
  [Locale.ES_ES]: Config.fromJson({ ...base, tiles: tilesEs }),
  [Locale.FR_FR]: Config.fromJson({ ...base, tiles: tilesFr }),
  [Locale.PL_PL]: Config.fromJson({ ...base, tiles: tilesPl }),
};

export default scrabble;
