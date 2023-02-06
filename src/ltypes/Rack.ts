import RackJson from './RackJson';
import RackLetter from './RackLetter';

class Rack {
  public static create(numLetters: number): Rack {
    return Rack.fromArrays(
      Array(numLetters).fill(''),
      Array(numLetters).fill(false),
    );
  }

  public static fromJson(json: RackJson): Rack {
    return new Rack({
      letters: json.letters.map(RackLetter.fromJson),
    });
  }

  public static fromArrays(letterArray: string[], selectedArray: boolean[]): Rack {
    return new Rack({
      letters: letterArray.map((l, index) =>
        new RackLetter({
          letter: l,
          selected: selectedArray[index],
        })
      ),
    });
  }

  constructor({ letters }: { letters: RackLetter[] }) {
    this.letters = letters;
  }

  public clone(): Rack {
    const letters = this.letters.map((l) => l.clone());
    return new Rack({ letters });
  }

  public getLetters(): RackLetter[] {
    return this.letters;
  }

  public getOneLetter(index: number): RackLetter {
    return this.letters[index];
  }

  public update(index: number, updateLetter: (letter: RackLetter) => RackLetter): void {
    this.letters[index] = updateLetter(this.letters[index]);
  }

  public length(): number {
    return this.letters.length;
  }

  public toJson(): RackJson {
    return {
      letters: this.letters.map((letter) => letter.toJson()),
    };
  }

  public selectedLetters(): string {
    return this.letters.filter((rl) => rl.selected).map((rl) => rl.letter).join('');
  }

  public shuffle(): void {
    let currentIndex = this.letters.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.letters[currentIndex], this.letters[randomIndex]] = [
        this.letters[randomIndex], this.letters[currentIndex]];
    }
  }

  public readonly letters: RackLetter[];
}

export default Rack;
