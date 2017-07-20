import Card from './Card';
import cards from './cards.json';

/**
 * Deck Class
 */
export default class Deck{
  constructor(){
    this.cards = [];
    for (var i = 0; i < cards.deck.length; i++) {
      this.cards.push(new Card(cards.deck[i].value, cards.deck[i].suit));
    }
  }

  /**
   * shuffle() shuffles cards
   */
  shuffle(){
    var curIndex = this.cards.length, temp, randIndex;
    while (curIndex != 0) {
      randIndex = Math.floor(Math.random() * curIndex);
      curIndex -= 1;
      temp = this.cards[curIndex];
      this.cards[curIndex] = this.cards[randIndex];
      this.cards[randIndex] = temp;
    }
  }

  /**
   * pullCards() returns array and removes taken cards
   * default size is 1
   */
  pullCards(count = 1){
    return this.cards.splice(0, count);
  }

  /**
   * getCount() return current amount of cards in Deck
   */
  getCount(){
    return this.cards.length;
  }
}
