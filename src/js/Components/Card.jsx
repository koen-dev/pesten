import React from 'react';

export default class Card extends React.Component{
  render(){
    var classNames = `card ${this.props.card.suit}`;
    return(
      <li className={classNames}>
        <div className="value">{this.props.card.value}</div>
        <div className="value">{this.props.card.value}</div>
      </li>
    )
  }
}
