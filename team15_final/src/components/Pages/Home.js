import React from "react";

export const Home = () => {
  return (
    <div>
      <h1>How to Play Hangman</h1>
      <p>
        The game web page will ask you to select a level of difficulty: easy,
        medium, hard. After a choice has been made, the game set up will be a
        set of dashes/underscores to represent the hidden word.
      </p>{" "}
      <br></br>
      <p>
        There will be set up for the stick figure hangman to be drawn to
        represent the "life” of the game. <br></br>
        You can guess letters in two ways: <br></br>
        1. Click a letter on the display screen keyboard <br></br>
        2. Click a letter on your physical keyboard. <br></br>
        For every letter guessed, the keyboard will disable the letter.
      </p>{" "}
      <br></br>
      <p>
        If the guessed letter is a part of the hidden word or phrase, then that
        letter will be appear in its correct location of the set of dashes. If
        the guessed letter is not a part of the hidden word or phrase, then an
        element of the hangman will appear.
      </p>{" "}
      <br></br>
      <p>
        You will continue playing the game until they guess the hidden word or
        until there are no more elements to add to the hangman. If all elements
        of the hangman are added, then you have lost the game, and the hidden
        word or phrase will be revealed. If you guesse the word without adding
        all hangman elements, then you have won.
      </p>{" "}
      <br></br>
      <div>
        <h2>Here is an example</h2>
        <div>
          <video width="750" height="500" controls>
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </div>
        <br></br> <br></br>
      </div>
      <div>
        <h1>How to Play Minesweeper</h1> <br></br>
      </div>
    </div>
  );
};
