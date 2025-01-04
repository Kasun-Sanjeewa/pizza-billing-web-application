import { useState, useEffect } from 'react';
import './App.css';
import ItemManagement from './Components/ItemManagement';
import NavBar from './Components/NavBar';

function App() {

  const [newItem, setNewItem] = useState([])

  // Initialize the state with value from localStorage
  const [isTrue, setIsTrue] = useState(() => {
    const storedState = localStorage.getItem('isTrue');
    return storedState !== null ? JSON.parse(storedState) : true; // Default to true if not set
  });

  // Update localStorage whenever isTrue changes
  useEffect(() => {
    localStorage.setItem('isTrue', JSON.stringify(isTrue));
  }, [isTrue]);

  const isTrueHandler = (data) => {
    setIsTrue(data); // Update the state
  };

  const handleNewItem = (data) => {
    setNewItem(data)
  }



  return (
    <>
      {isTrue ? (
        <NavBar isTrueHandler={isTrueHandler} items={newItem} />
      ) : (
        <ItemManagement isTrueHandler={isTrueHandler} handleNewItem={handleNewItem} />
      )}
    </>
  );
}

export default App;
