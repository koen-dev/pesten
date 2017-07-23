import Player from './Player';
import Deck from './Deck';
import {GamePile, PickPile} from './Piles';

export default class Game{
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

  /**
   * startGame()
   * Starts a new game by resetting all piles and players.
   */
  startGame(){
    let playerNames = this.players.map((player) => { return player.name; });
    console.log(`Starting game with ${playerNames.join(", ")}`);
    this.deck = new Deck();
    this.pullpile = new PickPile();
    this.gamepile = new GamePile();
    this.ended = false;
    this.deck.shuffle();
    this.players.forEach((player) => {
      player.canplay = true;
      player.winner = false;
      player.cards = [];
      player.addCards(this.deck.pullCards(7));
      let dealtCards = player.cards.map((card) => { return card.toString(); });
      console.log(`${player.name} has been dealt: ${dealtCards.join(", ")}`);
    });
    let rest = this.deck.pullCards(this.deck.getCount());
    this.pullpile.addCards(rest);
    this.gamepile.addCards(this.pullpile.pullCards());
    console.log(`Top card is: ${this.gamepile.getTopcard().toString()}`);
    while (!this.ended) {
      this.playRound();
    }
    this.update();
  }

  /**
   * playRound()
   * Simulates a game round by letting every player play his turn.
   * after everyone has played check if everyone can still play.
   */
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
      console.log(`Deck is empty and no one can play their cards. Game ended.`);
    }
  }

  /**
   * playerTurn(player)
   * Simulates a player playing in a round.
   * Check if player has cards and can pull a new card or play a card.
   */
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
        console.log(`${player.name} plays ${playcard.toString()}`);
        if (player.getCount() == 0) {
          player.winner = true;
          this.ended = true;
          console.log(`${player.name} has won.`);
        }else if(player.getCount() == 1){
          console.log(`${player.name} has 1 card remaining!`);
        }
      }else if(this.pullpile.getCount() > 0){
        let pulledCard = this.pullpile.pullCards();
        player.addCards(pulledCard);
        console.log(`${player.name} does not have a suitable card, taking from deck ${pulledCard.toString()}`);
      }else{
        console.log(`${player.name} does not have a suitable card, skips turn because deck is empty.`)
        player.canplay = false;
      }
    }
  }
}
