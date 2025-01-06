import { useState, useEffect } from 'react';
import './App.css';
import ItemManagement from './Components/ItemManagement';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';
import clickSoundFile from './assets/popup.mp3';
function App() {

  // State to manage whether `isTrue` is true or false, with an initial value from localStorage
  const [isTrue, setIsTrue] = useState(() => {
    const storedState = localStorage.getItem('isTrue');
    return storedState !== null ? JSON.parse(storedState) : true;
  });

  // State to manage user authentication status (signed in or not)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to persist `isTrue` state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isTrue', JSON.stringify(isTrue));
  }, [isTrue]);

  // Function to handle updates to `isTrue` state
  const isTrueHandler = (data) => {
    setIsTrue(data); // Update the state based on the received data
  };


  // Update the state based on the received data
  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus); // Update the authentication state
  };


  // Effect to manage the click sound functionality when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) { // Only add the event listener when signed in
      const clickSound = new Audio(clickSoundFile);

      // Function to play the sound effect on document clicks
      const playSound = () => {
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => {
          console.error('Sound playback failed:', error);
        });
      };

      document.addEventListener('click', playSound);
      // Cleanup function to remove the event listener when the component unmounts or `isAuthenticated` changes
      return () => {
        document.removeEventListener('click', playSound); // Remove listener when signed out
      };
    }
  }, [isAuthenticated]); // Re-run the effect when authentication state changes

  return (
    <>
      {!isAuthenticated ? (
        <SignIn onLogin={handleLogin} />
      ) : isTrue ? (
        <NavBar isTrueHandler={isTrueHandler} />
      ) : (
        <ItemManagement isTrueHandler={isTrueHandler} />
      )}
    </>
  );
}

export default App;
