import RackLetterJson from './RackLetterJson';

class RackLetter {
  public static fromJson(json: RackLetterJson): RackLetter {
    return new RackLetter({
      letter: json.letter,
      selected: json.selected,
    });
  }

  public readonly letter: string;
  public readonly selected: boolean;

  // eslint-disable-next-line no-undef
  constructor({ letter = '', selected = false }: { letter?: string; selected?: boolean }) {
    this.letter = letter;
    this.selected = selected;
  }

  public clone(): RackLetter {
    return new RackLetter({
      letter: this.letter,
      selected: this.selected,
    });
  }

  public toJson(): RackLetterJson {
    return {
      letter: this.letter,
      selected: this.selected,
    };
  }

  public toString(): string {
    return this.letter;
  }
}

export default RackLetter;

