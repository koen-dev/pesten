import React from 'react';
import Card from './Card.jsx';

export default class PullPile extends React.Component{
  render(){
    var pullpile = null;
    var pullPileClass = "";
    if (this.props.pile) {
      pullpile = this.props.pile.cards.map((card) =>
        <Card key={card.toString()} card={card}/>
      );
      pullPileClass = (pullpile.length > 0) ? "" : "empty";
    }
    return(
      <div className="pile">
        <div className="name">Pull Pile</div>
        <ul id="pullpile" className={pullPileClass}>
          {pullpile}
        </ul>
      </div>
    );
  }
}
