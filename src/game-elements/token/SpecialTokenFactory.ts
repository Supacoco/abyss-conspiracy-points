import { PearlMaster, SpecialToken } from "./SpecialToken";

export class SpecialTokenFactory {
  public static create(type: string): SpecialToken {
    switch (type) {
      case "PearlMaster": {
        return new PearlMaster();
      }

      default: {
        throw new Error(
          "SpecialToken factory => create, type should be defined"
        );
      }
    }
  }
}
