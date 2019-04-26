import React, { Component } from "react";
import Title from "./components/Title/index.js";
import GameCard from "./components/GameCard/index.js";
import gamecards from "./gamecards.json";
import Wrapper from "./Wrapper/index.js";

let foo = JSON.parse(JSON.stringify(gamecards));
let highscore = 0;

console.log("foo is:", foo);
class App extends Component {
  constructor() {
    super();
    this.state = {
      gamecards: gamecards,
      clicked: [],
      status: "New Game!",
      score: 0
    };
  }

  shuffleArray = array => {
    //shuffle the array
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  cardClickHandler = id => {
    // get the id of the clicked card
    let tempArray = this.state.gamecards;
    let x = tempArray.findIndex(i => i.id === id);

    // if the card was already clicked, reset the game, otherwise, set its clicked property to true, shuffle and keep playing
    if (tempArray[x].clicked) {
      tempArray = this.state.gamecards.map(card =>
        Object.assign({ ...card }, { clicked: false })
      );
      if (this.state.score > highscore) {
        highscore = this.state.score;
      }
      this.setState({
        gamecards: tempArray,
        status: "Already guessed! Starting a new game!",
        score: 0
      });
    } else {
      tempArray[x].clicked = "true";
      this.setState({
        gamecards: this.shuffleArray(tempArray),
        status: "Good guess!",
        score: this.state.score + 1
      });
    }
  };

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4 title">
              <Title />
            </h3>
            <div className="infoContainer">
              <div className="score">Score is: {this.state.score}</div>
              <div className="highScore">High score is:{highscore}</div>
              <div className="status">{this.state.status}</div>
            </div>
          </div>
        </div>

        <Wrapper>
          {this.state.gamecards.map(gamecard => (
            <GameCard
              key={gamecard.id}
              id={gamecard.id}
              name={gamecard.name}
              image={gamecard.image}
              clicked={gamecard.clicked}
              cardClickHandler={this.cardClickHandler}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
