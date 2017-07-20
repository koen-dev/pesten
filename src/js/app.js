class Card {
  constructor(value, suit){
    this.value = value;
    this.suit = suit;
  }
}

class Deck{
  constructor(){
    var test = [{"value":"A","suit":"Heart"},{"value":"2","suit":"Heart"},
    {"value":"3","suit":"Heart"},{"value":"4","suit":"Heart"},
    {"value":"5","suit":"Heart"},{"value":"6","suit":"Heart"},
    {"value":"7","suit":"Heart"},{"value":"8","suit":"Heart"},
    {"value":"9","suit":"Heart"},{"value":"10","suit":"Heart"},
    {"value":"J","suit":"Heart"},{"value":"Q","suit":"Heart"},
    {"value":"K","suit":"Heart"},{"value":"A","suit":"Diamond"},
    {"value":"2","suit":"Diamond"},{"value":"3","suit":"Diamond"},
    {"value":"4","suit":"Diamond"},{"value":"5","suit":"Diamond"},
    {"value":"6","suit":"Diamond"},{"value":"7","suit":"Diamond"},
    {"value":"8","suit":"Diamond"},{"value":"9","suit":"Diamond"},
    {"value":"10","suit":"Diamond"},{"value":"J","suit":"Diamond"},
    {"value":"Q","suit":"Diamond"},{"value":"K","suit":"Diamond"},
    {"value":"A","suit":"Club"},{"value":"2","suit":"Club"},
    {"value":"3","suit":"Club"},{"value":"4","suit":"Club"},
    {"value":"5","suit":"Club"},{"value":"6","suit":"Club"},
    {"value":"7","suit":"Club"},{"value":"8","suit":"Club"},
    {"value":"9","suit":"Club"},{"value":"10","suit":"Club"},
    {"value":"J","suit":"Club"},{"value":"Q","suit":"Club"},
    {"value":"K","suit":"Club"},{"value":"A","suit":"Spade"},
    {"value":"2","suit":"Spade"},{"value":"3","suit":"Spade"},
    {"value":"4","suit":"Spade"},{"value":"5","suit":"Spade"},
    {"value":"6","suit":"Spade"},{"value":"7","suit":"Spade"},
    {"value":"8","suit":"Spade"},{"value":"9","suit":"Spade"},
    {"value":"10","suit":"Spade"},{"value":"J","suit":"Spade"},
    {"value":"Q","suit":"Spade"},{"value":"K","suit":"Spade"}];
    this.cards = [];
    for (var i = 0; i < test.length; i++) {
      this.cards.push(new Card(test[i].value, test[i].suit));
    }
  }

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

  getCards(count = 1){
    return this.cards.splice(0, count);
  }

  get count(){
    return this.cards.length;
  }
}

class Player{
  constructor(name){
    this.name = name;
    this.cards = [];
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

  get count(){
    return this.cards.length;
  }
}

class CardPile{
  constructor(){
    this.cards = [];
  }

  addCards(cards){
    this.cards = this.cards.concat(cards);
  }

  getCards(count = 1){
    return this.cards.splice(0, count);
  }

  get count(){
    return this.cards.lenght;
  }
}

class CardGamePile{
  constructor(){
    this.cards = [];
  }

  get topcard(){
    return this.cards[0];
  }

  addCards(cards){
    this.cards = cards.concat(this.cards);
  }
}

class Game{
  constructor(){
    this.deck = new Deck();
    this.pile = new CardPile();
    this.gamepile = new CardGamePile();
    this.players = [new Player("Koen"), new Player("Peter"), new Player("Jan"),
     new Player("Klaas")];
  }

  start(playcards = 7){
    this.deck.shuffle();
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].addCards(this.deck.getCards(playcards));
    }
    var rest = this.deck.getCards(this.deck.count);
    this.pile.addCards(rest);
    this.gamepile.addCards(this.pile.getCards());
    var hasWinner = false;
    while(!hasWinner){
      for (var i = 0; i < this.players.length; i++) {
        var topcard = this.gamepile.topcard;
        console.log(topcard);
        if(this.players[i].count > 0){
          var playablecards = this.players[i].cards.filter(function (card){
            return card.value == topcard.value || card.suit == topcard.suit;
          });
          if (playablecards.length > 0) {
            this.players[i].removeCard(playablecards[0]);
            this.gamepile.addCards([playablecards[0]]);
            if (this.players[i].count == 0) {
              hasWinner = true;
              console.log(this.players[i]);
              break;
            }
          }else{
            var pulledCard = this.pile.getCards();
            console.log(pulledCard);
            this.players[i].addCards(pulledCard);
          }
          console.log(playablecards);
        }
      }
    }
    console.log(this);
  }
}

new Game().start();
