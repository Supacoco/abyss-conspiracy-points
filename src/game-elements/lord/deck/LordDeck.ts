import { BaseDeck } from "../../../deck/BaseDeck";
import { families } from "../../../rules/config";
import { lordRepartition } from "../../../rules/repartition";
import {
  Level0Lord,
  Level1Lord,
  Level2Lord,
  Level3Lord,
  Level4Lord,
  Level6Lord,
  Lord,
} from "../Lord";

export class LordDeck extends BaseDeck<Lord> {
  init(): void {
    this.cards = families
      .map((familyType) => {
        const familyCards: Lord[] = [];

        lordRepartition.forEach((repartition) => {
          switch (repartition.lordLevel) {
            case 0: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level0Lord(familyType));
              }
              break;
            }
            case 1: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level1Lord(familyType));
              }
              break;
            }
            case 2: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level2Lord(familyType));
              }
              break;
            }
            case 3: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level3Lord(familyType));
              }
              break;
            }
            case 4: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level4Lord(familyType));
              }
              break;
            }
            case 6: {
              for (let i = 1; i <= repartition.number; i++) {
                familyCards.push(new Level6Lord(familyType));
              }
              break;
            }
          }
        });

        return familyCards;
      })
      .flat();
  }
}
