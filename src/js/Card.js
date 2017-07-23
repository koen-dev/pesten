export default class Card {
  constructor(value, suit){
    this.value = value;
    this.suit = suit;
  }

  /**
   * toString()
   * retuns the object as a readable string using a symbol for the suit
   */
  toString(){
    var symbol = "";
    switch (this.suit) {
      case "Spade":
        symbol = "♠";
        break;
      case "Diamond":
        symbol = "♦";
        break;
      case "Club":
        symbol = "♣";
        break;
      case "Heart":
        symbol = "♥";
        break;
    }
    return `${symbol}${this.value}`;
  }
}
