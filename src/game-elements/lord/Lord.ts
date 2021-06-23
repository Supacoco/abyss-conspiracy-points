import { LORD_FAMILY, LORD_KEY } from "@/rules/config";

export abstract class Lord {
  constructor(
    private family: LORD_FAMILY,
    private value: number,
    private pearl: number = 0,
    private key: LORD_KEY = LORD_KEY.NONE
  ) {}

  getFamily(): LORD_FAMILY {
    return this.family;
  }

  getValue(): number {
    return this.value;
  }

  getPearl(): number {
    return this.pearl;
  }

  getKey(): LORD_KEY {
    return this.key;
  }
}

export class Level0Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 0);
  }
}

export class Level1Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 1, 0, LORD_KEY.SILVER);
  }
}

export class Level2Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 2, 0, LORD_KEY.GOLD);
  }
}

export class Level3Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 3, 2);
  }
}

export class Level4Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 4, 1);
  }
}

export class Level6Lord extends Lord {
  constructor(family: LORD_FAMILY) {
    super(family, 6);
  }
}
