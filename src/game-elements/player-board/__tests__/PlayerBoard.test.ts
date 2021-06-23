import {
  Level1Lord,
  Level2Lord,
  Level3Lord,
  Level4Lord,
  Level6Lord,
} from "@/game-elements/lord";
import { PearlMaster } from "@/game-elements/token";
import { COALITION_MULTIPLIER, LORD_FAMILY, LORD_KEY } from "@/rules/config";
import {
  LocationFamily,
  LocationLocation,
  LocationLvl5,
  LocationLvl7,
} from "../../location/Location";
import { PlayerBoard } from "../PlayerBoard";

describe("PlayerBoard test suite", () => {
  describe("addLord test suite", () => {
    it("should add the lord to the playerboard lords", () => {
      const playerBoard = new PlayerBoard("Sif");
      const lord = new Level4Lord(LORD_FAMILY.MAGE);

      playerBoard.addLord(lord);

      expect(playerBoard.getLords()[0]).toEqual(lord);
    });

    it("should add a key to the playerboard if lord has any", () => {
      const playerBoard = new PlayerBoard("Sif");
      const lordGold = new Level2Lord(LORD_FAMILY.MAGE);
      const expectedStep1 = {
        [LORD_KEY.SILVER]: 0,
        [LORD_KEY.GOLD]: 1,
        [LORD_KEY.NONE]: 0,
      };

      playerBoard.addLord(lordGold);

      expect(playerBoard.getKeys()).toEqual(expectedStep1);

      const lordSilver = new Level1Lord(LORD_FAMILY.FARMER);
      const expectedStep2 = {
        [LORD_KEY.SILVER]: 1,
        [LORD_KEY.GOLD]: 1,
        [LORD_KEY.NONE]: 0,
      };

      playerBoard.addLord(lordSilver);

      expect(playerBoard.getKeys()).toEqual(expectedStep2);

      const lordNoKey = new Level6Lord(LORD_FAMILY.FARMER);

      const expectedFinal = {
        [LORD_KEY.SILVER]: 1,
        [LORD_KEY.GOLD]: 1,
        [LORD_KEY.NONE]: 1,
      };

      playerBoard.addLord(lordNoKey);

      expect(playerBoard.getKeys()).toEqual(expectedFinal);
    });

    it("should update highestLords score upon lord addition", () => {
      const playerBoard = new PlayerBoard("Sif");
      const spy = jest.spyOn(playerBoard, "updateHighestLords");
      const lord = new Level3Lord(LORD_FAMILY.FARMER);

      playerBoard.addLord(lord);

      expect(spy).toHaveBeenCalledWith(lord);
    });

    it("should throw an error if trying to add more than 15 lords", () => {
      const playerBoard = new PlayerBoard("Sif");
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MAGE));
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.POLITICIAN));

      expect(() => {
        playerBoard.addLord(new Level6Lord(LORD_FAMILY.MILITARY));
      }).toThrow("PlayerBoard => Player board is full");
    });
  });

  describe("addLocation test suite", () => {
    it("should add the location to the playerboard location pool", () => {
      const playerBoard = new PlayerBoard("Sif");
      const location = new LocationLvl7();

      playerBoard.addLocation(location);

      expect(playerBoard.getLocations()[0]).toEqual(location);
    });

    it("should add location pearls to playerboard if it has any", () => {
      const playerBoard = new PlayerBoard("Sif");
      const location = new LocationLvl5();

      playerBoard.addLocation(location);

      expect(playerBoard.getPearls()).toEqual(location.getPearls());
    });
  });

  describe("addSpecialToken test suite", () => {
    it("should add the given token to the playerboard token pool", () => {
      const playerBoard = new PlayerBoard("Sif");
      const pearlMaster = new PearlMaster();

      playerBoard.addSpecialToken(pearlMaster);

      expect(playerBoard.getTokens()[0]).toEqual(pearlMaster);
    });
  });

  describe("updateHighestLord test suite", () => {
    it("should replace null by lord's value if it's the first of the family", () => {
      const playerBoard = new PlayerBoard("Sif");

      expect(playerBoard.getHighestLords()).toEqual({
        [LORD_FAMILY.POLITICIAN]: null,
        [LORD_FAMILY.MERCHANT]: null,
        [LORD_FAMILY.FARMER]: null,
        [LORD_FAMILY.MILITARY]: null,
        [LORD_FAMILY.MAGE]: null,
      });

      playerBoard.addLord(new Level4Lord(LORD_FAMILY.MAGE));

      expect(playerBoard.getHighestLords()).toEqual({
        [LORD_FAMILY.POLITICIAN]: null,
        [LORD_FAMILY.MERCHANT]: null,
        [LORD_FAMILY.FARMER]: null,
        [LORD_FAMILY.MILITARY]: null,
        [LORD_FAMILY.MAGE]: 4,
      });
    });

    it("should update highestLord when lord value is higher than stored one", () => {
      const playerBoard = new PlayerBoard("Sif");

      expect(playerBoard.getHighestLords()).toEqual({
        [LORD_FAMILY.POLITICIAN]: null,
        [LORD_FAMILY.MERCHANT]: null,
        [LORD_FAMILY.FARMER]: null,
        [LORD_FAMILY.MILITARY]: null,
        [LORD_FAMILY.MAGE]: null,
      });

      playerBoard.addLord(new Level4Lord(LORD_FAMILY.MERCHANT));

      expect(playerBoard.getHighestLords()).toEqual({
        [LORD_FAMILY.POLITICIAN]: null,
        [LORD_FAMILY.MERCHANT]: 4,
        [LORD_FAMILY.FARMER]: null,
        [LORD_FAMILY.MILITARY]: null,
        [LORD_FAMILY.MAGE]: null,
      });

      playerBoard.addLord(new Level6Lord(LORD_FAMILY.MERCHANT));

      expect(playerBoard.getHighestLords()).toEqual({
        [LORD_FAMILY.POLITICIAN]: null,
        [LORD_FAMILY.MERCHANT]: 6,
        [LORD_FAMILY.FARMER]: null,
        [LORD_FAMILY.MILITARY]: null,
        [LORD_FAMILY.MAGE]: null,
      });
    });
  });

  describe("setPlayerName test suite", () => {
    it("should update player name", () => {
      const playerBoard = new PlayerBoard("Sif");
      const expected = "Lady Maria";

      playerBoard.setPlayerName(expected);

      const result = playerBoard.getPlayerName();

      expect(result).toEqual(expected);
    });
  });

  describe("get total score test suite", () => {
    it("should add lord/coalition/location/token scores", () => {
      const playerBoard = new PlayerBoard("Sif");
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.MAGE));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.MAGE));
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.MILITARY));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MERCHANT));

      playerBoard.addLocation(new LocationFamily(LORD_FAMILY.MAGE));

      const expected = 16;
      const result = playerBoard.totalScore;

      expect(result).toEqual(expected);
    });
  });

  describe("get lord score test suite", () => {
    it("should use the highest lord of each family and add their scores", () => {
      const playerBoard = new PlayerBoard("Sif");
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.MAGE));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MILITARY));
      playerBoard.addLord(new Level6Lord(LORD_FAMILY.MERCHANT));

      const expectedScore = 17;
      const result = playerBoard.lordScore;

      expect(result).toEqual(expectedScore);
    });
  });

  describe("get coalition score test suite", () => {
    it("should walk the grid to find the biggest coalition and compute its score", () => {
      const playerBoard = new PlayerBoard("Sif");
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MAGE));
      playerBoard.addLord(new Level4Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.FARMER));
      playerBoard.addLord(new Level3Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.POLITICIAN));

      const expectedScore = 6 * COALITION_MULTIPLIER;
      const result = playerBoard.coalitionScore;

      expect(result).toEqual(expectedScore);
    });

    it("should compute coalition even if board is not complete", () => {
      const playerBoard = new PlayerBoard("Sif");
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.POLITICIAN));
      playerBoard.addLord(new Level2Lord(LORD_FAMILY.MERCHANT));
      playerBoard.addLord(new Level1Lord(LORD_FAMILY.FARMER));

      const expectedScore = 6;
      const result = playerBoard.coalitionScore;

      expect(result).toEqual(expectedScore);
    });
  });

  describe("get locationScore test suite", () => {
    it("should compute locations score based on each location value and special scoring", () => {
      const locationLvl7 = new LocationLvl7();
      const locationLocation = new LocationLocation();
      const playerBoard = new PlayerBoard("Sif");

      playerBoard.addLocation(locationLvl7);
      playerBoard.addLocation(locationLocation);

      const expectedScore = 11;
      const result = playerBoard.locationScore;

      expect(result).toEqual(expectedScore);
    });
  });

  describe("get specialTokenScore test suite", () => {
    it("should compute token score", () => {
      const pearlMaster = new PearlMaster();
      const playerBoard = new PlayerBoard("Sif");

      playerBoard.addSpecialToken(pearlMaster);

      const expectedScore = pearlMaster.getValue();
      const result = playerBoard.specialTokenScore;

      expect(result).toEqual(expectedScore);
    });
  });

  describe("get isPearlMaster test suite", () => {
    it("should return true if token pool length is greater than 0", () => {
      const playerBoard = new PlayerBoard("Sif");
      const pearlMaster = new PearlMaster();

      playerBoard.addSpecialToken(pearlMaster);

      const expected = true;
      const result = playerBoard.isPearlMaster;

      expect(result).toEqual(expected);
    });

    it("should return false if token pool is empty", () => {
      const playerBoard = new PlayerBoard("Sif");

      const expected = false;
      const result = playerBoard.isPearlMaster;

      expect(result).toEqual(expected);
    });
  });
});
