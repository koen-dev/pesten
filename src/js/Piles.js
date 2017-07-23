class Pile{
  constructor(){
    this.cards = [];
  }

  addCards(cards){
    this.cards = cards.concat(this.cards);
  }

  getCount(){
    return this.cards.length;
  }
}

export class PickPile extends Pile{
  pullCards(count = 1){
    return this.cards.splice(0, count);
  }
}

export class GamePile extends Pile{
  getTopcard(){
    return this.cards[0];
  }
}
