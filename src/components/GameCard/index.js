import React, { Component } from "react";
import "./style.css";

class GameCard extends Component {
  render() {
    return (
      <div
        className="card"
        onClick={() => this.props.cardClickHandler(this.props.id)}
      >
        <div className="card-body">
          <h1>{this.props.name}</h1>
          <h2>{this.props.id}</h2>
        </div>
      </div>
    );
  }
}

export default GameCard;
