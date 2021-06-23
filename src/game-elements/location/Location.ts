import { PlayerBoard } from "@/game-elements/player-board/PlayerBoard";
import { LORD_FAMILY, LORD_KEY } from "@/rules/config";

export function isFamilyEnhancedLocation(
  location:
    | LocationFamily
    | LocationFamilyMax
    | LocationSilverKey
    | LocationGoldKey
    | LocationLocation
    | LocationPearl
    | LocationLvl3
    | LocationLvl4
    | LocationLvl5
    | LocationLvl7
): location is LocationFamily | LocationFamilyMax {
  return (location as LocationFamily).getFamily !== undefined;
}

export abstract class Location {
  constructor(private value: number, protected pearls: number) {}

  abstract specialScoring(playerBoard: PlayerBoard): number;
  abstract toString(): string;

  getValue(): number {
    return this.value;
  }

  getPearls(): number {
    return this.pearls;
  }
}

export class LocationFamilyMax extends Location {
  constructor(private family: LORD_FAMILY) {
    super(0, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return playerBoard.getHighestLords()[this.family] || 0;
  }

  getFamily(): LORD_FAMILY {
    return this.family;
  }

  toString(): string {
    return `${this.family} - Max`;
  }
}

export class LocationFamily extends Location {
  constructor(private family: LORD_FAMILY) {
    super(1, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return playerBoard.getLords().filter((lord) => {
      return lord.getFamily() === this.family;
    }).length;
  }

  getFamily(): LORD_FAMILY {
    return this.family;
  }

  toString(): string {
    return `1 + ${this.family} #`;
  }
}

export class LocationSilverKey extends Location {
  constructor() {
    super(0, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return playerBoard.getLords().filter((lord) => {
      return lord.getKey() === LORD_KEY.SILVER;
    }).length;
  }

  toString(): string {
    return `1 per Silver Key`;
  }
}

export class LocationGoldKey extends Location {
  constructor() {
    super(0, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return (
      playerBoard.getLords().filter((lord) => {
        return lord.getKey() === LORD_KEY.GOLD;
      }).length * 2
    );
  }

  toString(): string {
    return `2 per Gold Key`;
  }
}

export class LocationLocation extends Location {
  constructor() {
    super(0, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return playerBoard.getLocations().length * 2;
  }

  toString(): string {
    return `2 per Location`;
  }
}

export class LocationPearl extends Location {
  constructor() {
    super(0, 0);
  }

  specialScoring(playerBoard: PlayerBoard): number {
    return Math.trunc(playerBoard.getPearls() / 2);
  }

  toString(): string {
    return `1 per pearl pair`;
  }
}

export class LocationLvl3 extends Location {
  constructor(pearls = 0) {
    super(3, pearls);
  }

  specialScoring(): number {
    return 0;
  }

  toString(): string {
    return this.pearls ? `3 + 3 pearls` : "3";
  }
}

export class LocationLvl4 extends Location {
  constructor() {
    super(4, 2);
  }

  specialScoring(): number {
    return 0;
  }

  toString(): string {
    return `4 + 2 pearls`;
  }
}

export class LocationLvl5 extends Location {
  constructor() {
    super(5, 1);
  }

  specialScoring(): number {
    return 0;
  }

  toString(): string {
    return `5 + 1 pearl`;
  }
}

export class LocationLvl7 extends Location {
  constructor() {
    super(7, 0);
  }

  specialScoring(): number {
    return 0;
  }

  toString(): string {
    return "7";
  }
}
