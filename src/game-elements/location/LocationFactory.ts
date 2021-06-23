import { LORD_FAMILY } from "@/rules/config";
import {
  Location,
  LocationFamily,
  LocationFamilyMax,
  LocationGoldKey,
  LocationLocation,
  LocationLvl3,
  LocationLvl4,
  LocationLvl5,
  LocationLvl7,
  LocationPearl,
  LocationSilverKey,
} from "./Location";

export class LocationFactory {
  public static create({
    type,
    family,
  }: {
    type: string;
    family?: LORD_FAMILY;
  }): Location {
    switch (type) {
      case "LocationLvl7": {
        return new LocationLvl7();
      }

      case "LocationLvl5": {
        return new LocationLvl5();
      }

      case "LocationLvl4": {
        return new LocationLvl4();
      }

      case "LocationLvl3": {
        return new LocationLvl3();
      }

      case "LocationLvl3Pearl": {
        return new LocationLvl3(3);
      }

      case "LocationPearl": {
        return new LocationPearl();
      }

      case "LocationSilverKey": {
        return new LocationSilverKey();
      }

      case "LocationGoldKey": {
        return new LocationGoldKey();
      }

      case "LocationLocation": {
        return new LocationLocation();
      }

      case "LocationFamily": {
        if (!family) {
          throw new Error(
            "Location factory => LocationFamily, family should be defined"
          );
        }

        return new LocationFamily(family);
      }

      case "LocationFamilyMax": {
        if (!family) {
          throw new Error(
            "Location factory => LocationFamilyMax, family should be defined"
          );
        }
        return new LocationFamilyMax(family);
      }

      default: {
        throw new Error("Location factory => create, type should be defined");
      }
    }
  }
}
