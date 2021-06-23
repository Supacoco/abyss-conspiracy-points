import { Location } from "@/game-elements/location/Location";
import { Lord } from "@/game-elements/lord/Lord";
import { SpecialToken } from "@/game-elements/token/SpecialToken";
import { COALITION_MULTIPLIER, LORD_FAMILY, LORD_KEY } from "@/rules/config";
import { walk } from "@/utils/walk";

export class PlayerBoard {
  private pearls = 0;
  private keys: { [key in LORD_KEY]: number } = {
    [LORD_KEY.SILVER]: 0,
    [LORD_KEY.GOLD]: 0,
    [LORD_KEY.NONE]: 0,
  };
  private highestLords: { [key in LORD_FAMILY]: null | number } = {
    [LORD_FAMILY.POLITICIAN]: null,
    [LORD_FAMILY.MERCHANT]: null,
    [LORD_FAMILY.FARMER]: null,
    [LORD_FAMILY.MILITARY]: null,
    [LORD_FAMILY.MAGE]: null,
  };

  private lords: Lord[] = [];
  private locations: Location[] = [];
  private specialTokens: SpecialToken[] = [];

  private gridAdjacency: number[][] = [
    [1, 5], // 0
    [0, 2, 5, 6], // 1
    [1, 3, 6, 7], // 2
    [2, 4, 7, 8], // 3
    [3, 8], // 4
    [0, 1, 6, 9], // 5
    [1, 2, 5, 7, 9, 10], // 6
    [2, 3, 6, 8, 10, 11], // 7
    [3, 4, 7, 11], // 8
    [5, 6, 10, 12], // 9
    [6, 7, 9, 11, 12, 13], // 10
    [7, 8, 10, 13], // 11
    [9, 10, 13, 14], // 12
    [10, 11, 12, 14], // 13
    [12, 13], // 14
  ];

  constructor(private playerName: string) {}

  addLord(lord: Lord): void {
    if (this.lords.length < 15) {
      this.lords.push(lord);

      this.pearls += lord.getPearl();

      const keyType: LORD_KEY = lord.getKey();
      this.keys[keyType] += 1;

      this.updateHighestLords(lord);
    } else {
      throw new Error("PlayerBoard => Player board is full");
    }
  }

  addLocation(location: Location): void {
    this.locations.push(location);

    this.pearls += location.getPearls();
  }

  addSpecialToken(token: SpecialToken): void {
    this.specialTokens.push(token);
  }

  updateHighestLords(lord: Lord): void {
    const lordFamily = lord.getFamily();
    const highestFromFamily = this.highestLords[lordFamily];

    if (!highestFromFamily) {
      this.highestLords[lordFamily] = lord.getValue();
    } else if (lord.getValue() > highestFromFamily) {
      this.highestLords[lordFamily] = lord.getValue();
    }
  }

  getPearls(): number {
    return this.pearls;
  }

  getLocations(): Location[] {
    return this.locations;
  }

  getLords(): Lord[] {
    return this.lords;
  }

  getTokens(): SpecialToken[] {
    return this.specialTokens;
  }

  getKeys(): { [key in LORD_KEY]: number } {
    return this.keys;
  }

  getHighestLords(): { [key in LORD_FAMILY]: null | number } {
    return this.highestLords;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  get totalScore(): number {
    return (
      this.lordScore +
      this.coalitionScore +
      this.locationScore +
      this.specialTokenScore
    );
  }

  get lordScore(): number {
    return Object.values(this.highestLords).reduce(
      (accumulator: number, value: number | null) => {
        return accumulator + (value || 0);
      },
      0
    );
  }

  get coalitionScore(): number {
    const coalitions: { coalition: number; family: LORD_FAMILY }[] = [];
    let visited: { [key in number]: boolean } = {};

    this.lords.forEach((_, index) => {
      if (!visited[index]) {
        const { coalition, family, ...rest } = walk(
          index,
          this.gridAdjacency,
          this.lords
        );
        coalitions.push({ coalition, family });

        visited = {
          ...visited,
          ...rest.visited,
        };
      }
    });

    return (
      coalitions.reduce((accumulator: number, current) => {
        if (current.coalition > accumulator) {
          accumulator = current.coalition;
        }

        return accumulator;
      }, 0) * COALITION_MULTIPLIER
    );
  }

  get locationScore(): number {
    return this.locations.reduce((accumulator, current) => {
      return accumulator + current.getValue() + current.specialScoring(this);
    }, 0);
  }

  get specialTokenScore(): number {
    return this.specialTokens.reduce((accumulator, current) => {
      return accumulator + current.getValue();
    }, 0);
  }

  get isPearlMaster(): boolean {
    return this.specialTokens.length > 0;
  }
}
