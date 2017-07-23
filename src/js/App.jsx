import Logger from './Helpers/Logger';
import Game from './Game';
import Player from './Components/Player.jsx';
import Card from './Components/Card.jsx';
import Controls from './Components/Controls.jsx';
import '../css/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.updateTest = this.updateTest.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      game: new Game(["Koen","Jan","Peter", "Klaas"]),
      canPlay: true
    }
    this.state.game.addListener(this.updateTest);
  }

  updateTest(){
    this.setState({
      game: this.state.game,
      canPlay: true
    });
  }

  componentDidMount(){
    this.startGame();
  }

  startGame(){
    this.setState({
      canPlay: false
    });
    this.state.game.startGame();
  }
  render(){
    const players = this.state.game.players.map((item) =>
      <Player key={item.name} player={item}/>
    );
    var gamepile = null;
    if (this.state.game.gamepile) {
      gamepile = this.state.game.gamepile.cards.reverse().map((card) =>
        <Card key={card.toString()} card={card}/>
      );
    }
    var pullpile = null;
    var pullPileClass = true;
    if (this.state.game.pullpile) {
      pullpile = this.state.game.pullpile.cards.map((card) =>
        <Card key={card.toString()} card={card}/>
      );
      pullPileClass = (pullpile.length > 0) ? "" : "empty";
    }
    return(
      <div id="playboard">
        <Controls startGame={this.startGame}/>
        <div id="players">
          {players}
        </div>
        <div id="piles">
          <div className="pile">
            <div className="name">Game Pile</div>
            <ul id="gamepile">
              {gamepile}
            </ul>
          </div>
          <div className="pile">
            <div className="name">Pull Pile</div>
            <ul id="pullpile" className={pullPileClass}>
              {pullpile}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
