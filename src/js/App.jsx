import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import Player from './Components/Player.jsx';
import Controls from './Components/Controls.jsx';
import GamePile from './Components/GamePile.jsx';
import PullPile from './Components/PullPile.jsx';
import '../css/style.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    this.updateGame = this.updateGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      game: new Game(["Koen","Jurian","Suraj", "Steve"]),
      canPlay: true
    }
    this.state.game.addListener(this.updateGame);
  }

  updateGame(){
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
    return(
      <div id="playboard">
        <Controls startGame={this.startGame}/>
        <div id="players">
          {players}
        </div>
        <div id="piles">
          <GamePile pile={this.state.game.gamepile}/>
          <PullPile pile={this.state.game.pullpile}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
