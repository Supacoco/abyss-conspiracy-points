export const COALITION_MULTIPLIER = 3;
export const MINIMUM_PLAYER = 2;
export const MAXIMUM_PLAYER = 4;

export enum LORD_KEY {
  GOLD = "GOLD",
  SILVER = "SILVER",
  NONE = "NONE",
}

export enum LORD_FAMILY {
  POLITICIAN = "Politician",
  MERCHANT = "Merchant",
  FARMER = "Farmer",
  MILITARY = "Military",
  MAGE = "Mage",
}

export const families = Object.values(LORD_FAMILY);
