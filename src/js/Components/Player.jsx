import React from 'react';
import Card from './Card.jsx';

export default class Player extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var classNames = "player" + (this.props.player.winner ? " winner" : "");
    var cards = this.props.player.cards.map((item) =>
      <Card key={item.toString()} card={item}/>
    );
    return(
      <div className={classNames}>
        <div className="name">{this.props.player.name}</div>
        <ul className="cards">{cards}</ul>
      </div>
    )
  }
}
