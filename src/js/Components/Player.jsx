import React from 'react';
import Card from './Card.jsx';

export default class Player extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    var cards = this.props.player.cards.map((item) =>
      <Card key={item.value + ":" + item.suit} value={item.value} suit={item.suit}/>
    );
    return(
      <div>
        <h3>{this.props.player.getName()}</h3>
        <ul>{cards}</ul>
      </div>
    )
  }
}
