// import React, { useState, useEffect } from 'react';

// function Crud() {
//   const [newWord, setNewWord] = useState('');
//   const [wordToDelete, setWordToDelete] = useState('');
//   const [selectedWord, setSelectedWord] = useState('');

//   useEffect(() => {
//     // Fetch initial word when the component mounts
//     fetchWord();
//   }, []);

//   async function fetchWord() {
//     try {
//       const response = await fetch('http://localhost:8081/listWords');
//       const data = await response.json();
//       if (data.length > 0) {
//         setSelectedWord(data[0].word);
//       }
//     } catch (error) {
//       console.error('Error fetching word:', error);
//     }
//   }

//   async function addWord() {
//     try {
//       const response = await fetch('http://localhost:8081/addWord', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ word: newWord }),
//       });
//       const data = await response.json();
//       console.log('Added word:', data);
//       // Fetch the updated word list after adding the word
//       fetchWord();
//     } catch (error) {
//       console.error('Error adding word:', error);
//     }
//   }

//   async function deleteWord() {
//     try {
//       const response = await fetch('http://localhost:8081/deleteWord', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ word: wordToDelete }),
//       });
//       const data = await response.json();
//       console.log('Deleted word:', data);
//       // Fetch the updated word list after deleting the word
//       fetchWord();
//     } catch (error) {
//       console.error('Error deleting word:', error);
//     }
//   }

//   return (
//     <>
//       <div className="form-container">
//         <label htmlFor="newWord">New Word: </label>
//         <input
//           type="text"
//           id="newWord"
//           value={newWord}
//           onChange={(e) => setNewWord(e.target.value)}
//         />
//         <button onClick={addWord}>Add Word</button>
//       </div>

//       <div className="form-container">
//         <label htmlFor="wordToDelete">Word to Delete: </label>
//         <input
//           type="text"
//           id="wordToDelete"
//           value={wordToDelete}
//           onChange={(e) => setWordToDelete(e.target.value)}
//         />
//         <button onClick={deleteWord}>Delete Word</button>
//       </div>
//     </>
//   );
// }

// export default Crud;




// Crud.js
import React, { useState, useEffect } from 'react';

function Crud() {
  const [newWord, setNewWord] = useState('');
  const [wordToDelete, setWordToDelete] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    // Fetch initial word when the component mounts
    fetchWord();
  }, []);


  async function fetchWord() {
    try {
      console.log('Fetching word...');
      const response = await fetch('http://localhost:8081/listWords');
      const data = await response.json();
      console.log('Fetched data:', data);
  
      // Rest of your code...
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  }
  
//   async function fetchWord() {
//     try {
//       const response = await fetch('http://localhost:8081/listWords');
//       const data = await response.json();
//       if (data.length > 0) {
//         setSelectedWord(data[0].word);
//         setWordList(data);
//       }
//     } catch (error) {
//       console.error('Error fetching word:', error);
//     }
//   }

// Client-side (React)
async function addWord() {
    try {
      const response = await fetch('http://localhost:8081/addWord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: newWord }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Added word:', data);
        // Fetch the updated word list after adding the word
        fetchWord();
      } else {
        console.error('Failed to add word. Status:', response.status);
      }
    } catch (error) {
      console.error('Error adding word:', error);
    }
  }
  

// async function addWord() {
//     try {
//       const response = await fetch('http://localhost:8081/addWord', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ word: newWord }),
//       });
  
//       const data = await response.json();
//       console.log('Added word:', data);
  
//       // Fetch the updated word list after adding the word
//       fetchWord();
//     } catch (error) {
//       console.error('Error adding word:', error);
//     }
//   }
  
  async function deleteWord() {
    try {
      const response = await fetch('http://localhost:8081/deleteWord', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: wordToDelete }),
      });
      const data = await response.json();
      console.log('Deleted word:', data);
      // Fetch the updated word list after deleting the word
      fetchWord();
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  }

  async function showWordList() {
    console.log('Word List:', wordList);
  }

  return (
    <>
      <div className="form-container">
        <button onClick={showWordList}>Show Word List</button>
      </div>

      <div className="form-container">
        <label htmlFor="newWord">New Word: </label>
        <input
          type="text"
          id="newWord"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <button onClick={addWord}>Add Word</button>
      </div>

      <div className="form-container">
        <label htmlFor="wordToDelete">Word to Delete: </label>
        <input
          type="text"
          id="wordToDelete"
          value={wordToDelete}
          onChange={(e) => setWordToDelete(e.target.value)}
        />
        <button onClick={deleteWord}>Delete Word</button>
      </div>

    </>
  );
}

export default Crud;



