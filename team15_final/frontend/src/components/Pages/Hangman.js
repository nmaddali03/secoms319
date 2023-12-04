import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Figure from '../Figure';
import WrongLetters from '../WrongLetters';
import Word from '../Word';
import Popup from '../Popup';
import Notification from '../Notification';
import { showNotification as show, checkWin } from '../helpers';

import './Hangman.css';

// const words = ['application', 'programming', 'interface', 'wizard'];
const words = require('./words.json');

let selectedWord = words[Math.floor(Math.random() * words.length)].word;

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState(words[Math.floor(Math.random() * words.length)].word);
  const [newWord, setNewWord] = useState('');



  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;

      if (document.activeElement.tagName === 'INPUT') {
        return;
      }
  

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    setSelectedWord(words[random].word);
    }

    async function fetchWord() {
      try {
        const response = await fetch('http://localhost:8081/listWords');
        const data = await response.json();
        if (data.length > 0) {
          setSelectedWord(data[0].word);
        }
      } catch (error) {
        console.error('Error fetching word:', error);
      }
    }
  

    async function addWord() {
      try {
        const response = await fetch('http://localhost:8081/addWord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word: newWord }),
        });
        const data = await response.json();
        console.log('Added word:', data);
        fetchWord();
      } catch (error) {
        console.error('Error adding word:', error);
      }
    }
  
    async function deleteWord() {
      try {
        const response = await fetch('http://localhost:8081/deleteWord', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: 1 }), // Replace with the actual ID to delete
        });
        const data = await response.json();
        console.log('Deleted word:', data);
        fetchWord();
      } catch (error) {
        console.error('Error deleting word:', error);
      }
    }
  

  // return (
  //   <>
  //     <Header />
  //     <div className="game-container">
  //       <Figure wrongLetters={wrongLetters} />
  //       <WrongLetters wrongLetters={wrongLetters} />
  //       <Word selectedWord={selectedWord} correctLetters={correctLetters} />
  //     </div>
  //     <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
  //     <Notification showNotification={showNotification} />
  //   </>
  // );

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
      <div className="form-container">
        <label htmlFor="newWord">New Word: </label>
        <input
          type="text"
          id="newWord"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <button onClick={addWord}>Add Word</button>
        <button onClick={deleteWord}>Delete Word</button>
      </div>
    </>
  );

}

export default App;