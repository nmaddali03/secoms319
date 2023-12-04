import React from 'react';
import { checkWin } from './helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, wordFetched }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if (!wordFetched) {
    return null;
  }

  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMessage = 'Congratulations! You won! 😃';
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  // Move the setPlayable call outside of useEffect
  setPlayable(playable);

  return (
    <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
