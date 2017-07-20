export default class Player{
  constructor(name){
    this._name = name;
    this._canplay = true;
    this.cards = [];
  }

  getCanplay(){
    return this._canplay;
  }

  setCanplay(val){
    this._canplay = val;
  }

  getName(){
    return this._name;
  }

  removeCard(card){
    var i = this.cards.indexOf(card);
    if (i > -1) {
      this.cards.splice(i, 1);
    }
  }

  addCards(cards){
    this.cards = this.cards.concat(cards);
  }

  getCount(){
    return this.cards.length;
  }
}
