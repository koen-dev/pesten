import React from 'react';
import Card from './Card.jsx';

export default class GamePile extends React.Component{
  render(){
    var gamepile = null;
    if (this.props.pile) {
      gamepile = this.props.pile.cards.reverse().map((card) =>
        <Card key={card.toString()} card={card}/>
      );
    }
    return(
      <div className="pile">
        <div className="name">Game Pile</div>
        <ul id="gamepile">
          {gamepile}
        </ul>
      </div>
    );
  }
}
