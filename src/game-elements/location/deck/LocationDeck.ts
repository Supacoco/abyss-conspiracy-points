import { BaseDeck } from "../../../deck/BaseDeck";
import { families } from "../../../rules/config";
import { locationRepartition } from "../../../rules/repartition";
import { LocationFactory } from "../LocationFactory";
import { Location } from "../Location";

export class LocationDeck extends BaseDeck<Location> {
  init(): void {
    this.cards = locationRepartition
      .map((repartition) => {
        const tmp = [];

        switch (repartition.type) {
          case "LocationFamily":
          case "LocationFamilyMax":
            families.forEach((family) => {
              try {
                tmp.push(
                  LocationFactory.create({
                    type: repartition.type,
                    family,
                  })
                );
              } catch (e) {
                //
              }
            });

            break;

          default: {
            for (let i = 0; i < repartition.number; i++) {
              try {
                tmp.push(LocationFactory.create({ type: repartition.type }));
              } catch (e) {
                //
              }
            }
          }
        }

        return tmp;
      })
      .flat();
  }
}
