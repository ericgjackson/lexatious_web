import PlacementJson from './PlacementJson';

class Placement {
  public static fromJson(json: PlacementJson): Placement {
    return new Placement({
      character: json.character,
      x: json.x,
      y: json.y,
    });
  }

  public character: string;
  public x: number;
  public y: number;

  constructor({ character, x, y }: { character: string; x: number, y: number }) {
    this.character = character;
    this.x = x;
    this.y = y;
  }

  public clone(): Placement {
    return new Placement({
      character: this.character,
      x: this.x,
      y: this.y,
    });
  }

  public equals(other: Placement): boolean {
    return this.character === other.character && this.x === other.x && this.y === other.y;
  }

  public toJson(): PlacementJson {
    return {
      character: this.character,
      x: this.x,
      y: this.y,
    };
  }

  public toString(): string {
    return this.character;
  }
}

export default Placement;

