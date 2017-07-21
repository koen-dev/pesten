import React from 'react';

export default class Card extends React.Component{
  render(){
    return(
      <li className="card">
        <div className="value">{this.props.value}</div>
        <div className="value">{this.props.value}</div>
      </li>
    )
  }
}
