export class PickPile{
  constructor(){
    this.cards = [];
  }

  addCards(cards){
    this.cards = this.cards.concat(cards);
  }

  getCards(count = 1){
    return this.cards.splice(0, count);
  }

  getCount(){
    return this.cards.length;
  }
}

export class GamePile{
  constructor(){
    this.cards = [];
  }

  getTopcard(){
    return this.cards[0];
  }

  addCards(cards){
    this.cards = cards.concat(this.cards);
  }
}
