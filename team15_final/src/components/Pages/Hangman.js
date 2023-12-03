import React, { useState, useEffect } from "react";
import canvasCreator from "./canvasCreator"; // Create a new file for the canvasCreator function
import "./Hangman.css"; // Create a CSS file for your component styles

export const Hangman = () => {
  const [options, setOptions] = useState({
    easy: "/easy.json",
    medium: "/medium.json",
    difficult: "/difficult.json",
  });

  const [winCount, setWinCount] = useState(0);
  const [count, setCount] = useState(0);
  const [chosenWord, setChosenWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchOptionsFromJSON = async (jsonFileName) => {
      try {
        const response = await fetch(jsonFileName);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error loading options from JSON files:", error);
        return null;
      }
    };

    const initializeHangman = async () => {
      setWinCount(0);
      setCount(0);
      setChosenWord("");

      try {
        // json case sensitive
        const easyOptions = await fetchOptionsFromJSON(options.easy);
        const mediumOptions = await fetchOptionsFromJSON(options.medium);
        const difficultOptions = await fetchOptionsFromJSON(options.difficult);

        setOptions({
          easy: easyOptions,
          medium: mediumOptions,
          difficult: difficultOptions,
        });
      } catch (error) {
        console.error("Error initializing Hangman:", error);
      }
    };

    initializeHangman();
  }, [options]);

  const handleUserInput = (input) => {
    if (chosenWord) {
      const charArray = chosenWord.split("");

      if (!disabledLetters.includes(input)) {
        if (charArray.includes(input.toUpperCase())) {
          charArray.forEach((char, index) => {
            if (char === input.toUpperCase()) {
              // Update state instead of directly manipulating the DOM
              setWinCount((prevWinCount) => prevWinCount + 1);
              if (winCount === charArray.length - 1) {
                setResult(`You Win!! The word was ${chosenWord}`);
              }
            }
          });
        } else {
          // Update state instead of directly manipulating the DOM
          setCount((prevCount) => prevCount + 1);
          if (count === 5) {
            setResult(`You Lose!! The word was ${chosenWord}`);
          }
        }

        // Update state instead of directly manipulating the DOM
        setDisabledLetters([...disabledLetters, input]);
      }
    }
  };

  const generateWord = (optionValue) => {
    let optionArray = options[optionValue];

    if (optionArray && optionArray.length > 0) {
      // Update state instead of directly manipulating the DOM
      setChosenWord(
        optionArray[Math.floor(Math.random() * optionArray.length)]
      );
      setChosenWord((prevChosenWord) => prevChosenWord.toUpperCase());
    } else {
      // Update state instead of directly manipulating the DOM
      setResult("No words available for this difficulty.");
    }
  };

  const drawMan = (count) => {
    // Implement the drawing logic using the canvasCreator
    // You can call the canvas drawing functions based on the count
  };

  return (
    <div className="container">
      <div id="options-container">
        <div id="letter-container" className="letter-container hide">
          <div className="user-input-section"></div>
          <canvas id="canvas"></canvas>
          <div id="new-game-container" className="new-game-popup hide">
            <div id="result-text"></div>
            <button id="new-game-button">New Game</button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Hangman;

/*
import React from "react";

export const Hangman = () => {
  return (
    <div className="container">
      <div id="options-container">
        <div id="letter-container" className="letter-container hide">
          <div className="user-input-section"></div>
          <canvas id="canvas">
          </canvas>
          <div id="new-game-container" className="new-game-popup hide">
            <div id="result-text"></div>
            <button id="new-game-button">New Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
