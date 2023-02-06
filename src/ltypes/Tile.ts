import EMPTY_CELL from './EmptyCell';
import TileJson from './TileJson';

class Tile {
  public static fromJson(json: TileJson | null): Tile {
    if (!json) {
      return Tile.Null;
    }

    return new Tile({
      character: json.character,
      occupier: json.occupier,
    });
  }

  public static readonly Null: Tile = Object.freeze({
    character: EMPTY_CELL,
    clone: () => Tile.Null,
    equals: (other: Tile) => other === Tile.Null,
    occupier: 0,
    toJson: () => null,
    toString: () => EMPTY_CELL,
  });

  public character: string;
  public occupier: number;

  constructor({ character, occupier }: { character: string; occupier: number }) {
    this.character = character;
    this.occupier = occupier;
  }

  public clone(): Tile {
    return new Tile({
      character: this.character,
      occupier: this.occupier,
    });
  }

  public equals(other: Tile): boolean {
    return this.character === other.character && this.occupier === other.occupier;
  }

  public toJson(): TileJson | null {
    return {
      character: this.character,
      occupier: this.occupier,
    };
  }

  public toString(): string {
    return this.character;
  }
}

export default Tile;
