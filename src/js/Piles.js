class Pile{
  constructor(){
    this.cards = [];
  }

  /**
   * addCards()
   * adds a set of cards to current pile
   */
  addCards(cards){
    this.cards = cards.concat(this.cards);
  }

  /**
   * getCount()
   * return current amount of cards in Deck
   */
  getCount(){
    return this.cards.length;
  }
}

/**
 * PickPile
 * has the method to pullCards()
 * this removes cards and returns it in an array
 */
export class PickPile extends Pile{
  pullCards(count = 1){
    return this.cards.splice(0, count);
  }
}

/**
 * GamePile
 * has the method to getTopcard()
 * this returns the current top card.
 */
export class GamePile extends Pile{
  getTopcard(){
    return this.cards[0];
  }
}
