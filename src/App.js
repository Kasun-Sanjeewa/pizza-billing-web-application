import { useState, useEffect } from 'react';
import './App.css';
import ItemManagement from './Components/ItemManagement';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';
import clickSoundFile from './assets/popup.mp3'; // Import the sound file

function App() {
  const [isTrue, setIsTrue] = useState(() => {
    const storedState = localStorage.getItem('isTrue');
    return storedState !== null ? JSON.parse(storedState) : true;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('isTrue', JSON.stringify(isTrue));
  }, [isTrue]);

  const isTrueHandler = (data) => {
    setIsTrue(data);
  };

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  useEffect(() => {
    if (isAuthenticated) { // Only add the event listener when signed in
      const clickSound = new Audio(clickSoundFile);

      const playSound = () => {
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => {
          console.error('Sound playback failed:', error);
        });
      };

      document.addEventListener('click', playSound);

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
