import ConfigJson from './ConfigJson';

class Config {
  public static fromJson(json: ConfigJson): Config {
    return new Config(json);
  }

  public readonly config: ConfigJson;

  constructor(config: ConfigJson) {
    this.config = config;
  }

  public get boardHeight(): number {
    return this.config.boardHeight;
  }

  public get boardWidth(): number {
    return this.config.boardWidth;
  }

  public hasCharacter(character: string): boolean {
    return this.config.tiles.indexOf(character) > -1;
  }

  public get maximumCharactersCount(): number {
    return this.config.maximumCharactersCount;
  }

  public get tiles(): string[] {
    return this.config.tiles;
  }

  public toJson(): ConfigJson {
    return this.config;
  }
}

export default Config;
