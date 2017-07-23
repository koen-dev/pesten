import Card from './Card';
import cards from './cards.json';

export default class Deck{
  /**
   * constructor()
   * Loading the JSON file cards.json for a 52 card deck
   */
  constructor(){
    this.cards = [];
    cards.deck.forEach((card) => {
      this.cards.push(new Card(card.value, card.suit));
    });
  }

  /**
   * shuffle()
   * Shuffles the cards
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
   * pullCards()
   * returns array and removes taken cards default size is 1
   */
  pullCards(count = 1){
    return this.cards.splice(0, count);
  }

  /**
   * getCount()
   * return current amount of cards in Deck
   */
  getCount(){
    return this.cards.length;
  }
}
