import { Locale } from 'ltypes';

const detectLocale = (): Locale => {
  if (window.navigator.languages.includes('pl') || window.navigator.languages.includes('pl-PL')) {
    return Locale.PL_PL;
  }

  if (window.navigator.languages.includes('en-GB')) {
    return Locale.EN_GB;
  }

  if (window.navigator.languages.includes('fr-FR')) {
    return Locale.FR_FR;
  }

  return Locale.EN_US;
};

export default detectLocale;
