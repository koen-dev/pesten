import React from 'react';

export default class Controls extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <header>
        <button onClick={this.props.startGame}>Start Game</button>
      </header>
    );
  }
}
