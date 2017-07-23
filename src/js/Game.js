import Player from './Player';
import Deck from './Deck';
import {GamePile, PickPile} from './Piles';

export default class Game{
  /**
   *
   */
  constructor(playerNames){
    if (playerNames && playerNames.length) {
      this.players = playerNames.map((player) => {
        return new Player(player);
      });
      this.listeners = [];
    }
  }

  /**
   * addListener(fn)
   * Add Listeners that get notified when something changes.
   */
  addListener(fn){
    this.listeners.push(fn);
  }

  /**
   * update()
   * Call this is to let the listeners know that something changed.
   */
  update(){
    this.listeners.forEach(fn => fn());
  }

  startGame(){
    this.deck = new Deck();
    this.pullpile = new PickPile();
    this.gamepile = new GamePile();
    this.ended = false;
    this.deck.shuffle();
    // Give every player starting cards
    this.players.forEach((player) => {
      player.canplay = true;
      player.winner = false;
      player.cards = [];
      player.addCards(this.deck.pullCards(7));
    });
    var rest = this.deck.pullCards(this.deck.getCount());
    this.pullpile.addCards(rest);
    this.gamepile.addCards(this.pullpile.pullCards());
    this.update();
    while (!this.ended) {
      this.playRound();
    }
    this.update();
  }

  playRound(){
    this.players.forEach((player) => {
      if (!this.ended) {
        this.playerTurn(player);
      }
    });

    var countCantPlay = this.players.filter((player) => {
      return !player.canplay;
    }).length;

    if (countCantPlay == this.players.length) {
      this.ended = true;
    }
  }

  playerTurn(player){
    if (player.getCount() > 0) {
      let topcard = this.gamepile.getTopcard();
      var playablecards = player.cards.filter((card) => {
        return card.value == topcard.value || card.suit == topcard.suit;
      });
      if (playablecards.length > 0) {
        let playcard = playablecards[0];
        player.removeCard(playcard);
        this.gamepile.addCards([playcard]);
        console.log(player.name + " played a " + playcard.value + " of " + playcard.suit + "'s");
        if (player.getCount() == 0) {
          player.winner = true;
          this.ended = true;
        }
      }else if(this.pullpile.getCount() > 0){
        let pulledCard = this.pullpile.pullCards();
        player.addCards(pulledCard);
      }else{
        player.canplay = false;
      }
    }
  }
}
