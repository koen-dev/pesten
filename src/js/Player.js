export default class Player{
  constructor(name){
    this.name = name;
    this.canplay = true;
    this.winner = false;
    this.cards = [];
  }

  /**
   * removeCard(card)
   * Removes a specific card in players hand.
   */
  removeCard(card){
    var i = this.cards.indexOf(card);
    if (i > -1) {
      this.cards.splice(i, 1);
    }
  }

  /**
   * addCards(cards)
   * Adds an array of cards to players hand.
   */
  addCards(cards){
    this.cards = this.cards.concat(cards);
  }

  /**
   * getCount()
   * Returns current count of cards in players hand.
   */
  getCount(){
    return this.cards.length;
  }
}
