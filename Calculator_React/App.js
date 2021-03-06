import React, { Component } from "react";
import { View, Text, AppRegistry } from "react-native";
import Style from "./src/Style";

import InputButton from "./src/InputButton";

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
  ["c", "ce"],
  [1, 2, 3, "/"],
  [4, 5, 6, "*"],
  [7, 8, 9, "-"],
  [0, ".", "=", "+"],
];

class ReactCalculator extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null,
    };

    this.state = this.initialState;
  }
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>{this._renderInputButtons()}</View>
      </View>
    );
  }
  _onInputButtonPressed(input) {
    switch (typeof input) {
      case "number":
        return this._handleNumberInput(input);
    }
  }

  _handleNumberInput(num) {
    let inputValue = this.state.inputValue + num;

    this.setState({
      inputValue: inputValue,
    });
  }

  _renderInputButtons() {
    let views = [];

    for (var r = 0; r < inputButtons.length; r++) {
      let row = inputButtons[r];

      let inputRow = [];
      for (var i = 0; i < row.length; i++) {
        let input = row[i];

        inputRow.push(
          <InputButton
            value={input}
            onPress={this._onInputButtonPressed.bind(this, input)}
            key={r + "-" + i}
          />
        );
      }

      views.push(
        <View style={Style.inputRow} key={"row-" + r}>
          {inputRow}
        </View>
      );
    }

    return views;
  }
  _onInputButtonPressed(input) {
    switch (typeof input) {
      case "number":
        return this._handleNumberInput(input);
      case "string":
        return this._handleStringInput(input);
    }
  }

  _handleStringInput(str) {
    switch (str) {
      case "/":
        if (this.state.inputValue === 0) {
          alert("Pas de division par 0 !");
          this.setState({
            previousInputValue: 0,
            inputValue: 0,
          });
        }
      case "*":
      case "+":
      case "-":
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0,
        });
        break;
      case ".":
        this.setState({
          inputValue: this.state.inputValue + str,
        });
      case "=":
        let symbol = this.state.selectedSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;

        if (!symbol) {
          return;
        }

        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null,
        });
        break;
      case "ce":
        this.setState(this.initialState);
        break;

      case "c":
        this.setState({ inputValue: 0 });
        break;
    }
  }
}

export default ReactCalculator;
