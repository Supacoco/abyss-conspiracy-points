export abstract class SpecialToken {
  constructor(private value: number) {}

  getValue(): number {
    return this.value;
  }
}

export class PearlMaster extends SpecialToken {
  constructor() {
    super(5);
  }
}
