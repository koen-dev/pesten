import Logger from './Helpers/Logger';
import Game from './Game';
import Player from './Components/Player.jsx';
import '../css/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.updateTest = this.updateTest.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      game: new Game()
    }
    this.state.game.addListener(this.updateTest);
  }

  updateTest(){
    this.setState({
      game: this.state.game
    });
  }

  startGame(){
    this.state.game.start();
  }

  componentDidMount(){
  }

  render(){
    const players = this.state.game.players.map((item) =>
      <Player key={item.getName()} player={item}/>
    );
    return(
      <div id="playboard">
        <button onClick={this.startGame}>play</button>
        <div id="players">
          {players}
        </div>
      </div>
    );
  }
}

var test = new Game();

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
