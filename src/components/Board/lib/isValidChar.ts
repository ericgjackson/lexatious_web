// Only the letters differ between their lower and upper case variants.
// Should test on languages other than English.
const isValidChar = (character: string) => {
  return character.toUpperCase() !== character.toLowerCase();
};

export default isValidChar;
