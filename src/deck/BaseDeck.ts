export abstract class BaseDeck<T> {
  protected cards: T[] = [];

  constructor() {
    this.init();
  }

  abstract init(): void;

  public getCards(): T[] {
    return this.cards;
  }

  public shuffle(): T[] {
    this.cards = Array(this.cards.length)
      .fill(null)
      .map((_, i) => [Math.random(), i])
      .sort(([a], [b]) => a - b)
      .map(([, i]) => this.cards[i]);

    return this.cards;
  }

  public removeCardAt(index: number): void {
    this.cards.splice(index, 1);
  }
}
