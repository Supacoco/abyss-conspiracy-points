import { BaseDeck } from "../../../deck/BaseDeck";
import { specialTokenRepartition } from "../../../rules/repartition";
import { SpecialToken } from "../SpecialToken";
import { SpecialTokenFactory } from "../SpecialTokenFactory";

export class SpecialTokenDeck extends BaseDeck<SpecialToken> {
  init(): void {
    this.cards = specialTokenRepartition
      .map((repartition) => {
        const tmp = [];

        switch (repartition.type) {
          case "PearlMaster": {
            try {
              for (let i = 0; i < repartition.number; i++) {
                tmp.push(SpecialTokenFactory.create(repartition.type));
              }
            } catch (e) {
              //
            }
          }
        }

        return tmp;
      })
      .flat();
  }
}
