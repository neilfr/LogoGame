import React, { Component } from "react";
import Title from "./components/Title/index.js";
import GameCard from "./components/GameCard/index.js";
import originalGamecards from "./gamecards.json";
import Wrapper from "./Wrapper/index.js";

const initialGamecardState = originalGamecards;

class App extends Component {
  constructor() {
    super();
    this.state = {
      gamecards: initialGamecardState,
      status: "New Game!",
      score: 0
    };
  }

  incrementScore = () => {
    // this.shuffle();
    let tempArray = [];
    tempArray = this.state.gamecards;
    let tempCard = tempArray[0];
    for (let i = 0; i < tempArray.length - 1; i++) {
      tempArray[i] = tempArray[i + 1];
    }
    tempArray[tempArray.length - 1] = tempCard;

    this.setState({
      gamecards: tempArray,
      status: "Good guess!",
      score: this.state.score + 1
    });
  };

  resetScore = () => {
    this.setState({
      gamecards: originalGamecards,
      status: "You already clicked me! Starting a new game!",
      score: 0
    });
  };

  cardClickHandler = id => {
    this.shuffledArray = id => {
      //update the clicked item's clicked status to true
      console.log("id passed into shuffledArray is:", id);
      let tempArray = this.state.gamecards;
      let x = tempArray.findIndex(i => i.id === id);
      tempArray[x].clicked = "true";

      //shuffle the array
      var currentIndex = tempArray.length;
      var temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = tempArray[currentIndex];
        tempArray[currentIndex] = tempArray[randomIndex];
        tempArray[randomIndex] = temporaryValue;
      }
      console.log("temp array is:", tempArray);
      return tempArray;
    };

    //update the state of the gamecards array
    this.setState({
      gamecards: this.shuffledArray(id)
    });
  };

  render() {
    return (
      <div>
        <Title />
        <h2>Score is: {this.state.score}</h2>
        <h3>Status is: {this.state.status}</h3>
        <Wrapper>
          {this.state.gamecards.map(gamecard => (
            <GameCard
              key={gamecard.id}
              id={gamecard.id}
              name={gamecard.name}
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
