import Player from './Player';
import Deck from './Deck';
import {GamePile, PickPile} from './Piles';

export default class Game{
  constructor(){
    this.deck = new Deck();
    this.pile = new PickPile();
    this.gamepile = new GamePile();
    this.players = [new Player("Koen"), new Player("Peter"), new Player("Jan"),
     new Player("Klaas")];
    this.ended = false;
    this.round = 0;
  }

  start(playcards = 7, speed = 0){
    this.deck.shuffle();
    // Give every player starting cards
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].addCards(this.deck.pullCards(playcards));
    }
    var rest = this.deck.pullCards(this.deck.getCount());
    this.pile.addCards(rest);
    this.gamepile.addCards(this.pile.getCards());
    console.log("First card on the game pile is " + this.gamepile.cards[0].value + " of " + this.gamepile.cards[0].suit);
    this.playRound();

    this.gameloop = setInterval(() => {
      if (!this.ended) {
        this.playRound();
      }else{
        clearInterval(this.gameloop);
        console.log(this.winner.getName() + " won this game! Congratulations");
      }
    }, speed);
  }

  playRound(){
    this.round++;
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var topcard = this.gamepile.getTopcard();

      if (player.getCount() > 0) {
        var playablecards = player.cards.filter((card) => {
          return card.value == topcard.value || card.suit == topcard.suit;
        });
        if (playablecards.length > 0) {
          var playcard = playablecards[0];
          player.removeCard(playcard);
          this.gamepile.addCards([playcard]);

          console.log(player.getName() + " played  " + playcard.value + " of " + playcard.suit + "'s");

          if (player.getCount() == 0) {
            this.ended = true;
            this.winner = player;
            break;
          }
        }else if(this.pile.getCount() > 0){
          var pulledCard = this.pile.getCards();
          player.addCards(pulledCard);
        }else{
          console.log("No playable cards and no cards left in pile.");
          player.setCanplay(false);
        }
      }
    }

    var countCantPlay = this.players.filter((player) => {
      return !player.getCanplay();
    })

    if (countCantPlay.length == this.players.length) {
      this.ended = true;
      this.winner = this.players.reduce((a,b) => {
        return (a.getCount() < b.getCount()) ? a : b;
      });

      console.log("All players don't have playable cards.");
    }
    console.log("End of round "+ this.round);
  }
}
