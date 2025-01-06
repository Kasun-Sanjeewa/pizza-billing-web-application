import { useState, useEffect } from 'react';
import './App.css';
import ItemManagement from './Components/ItemManagement';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';

function App() {
  const [isTrue, setIsTrue] = useState(() => {
    const storedState = localStorage.getItem('isTrue');
    return storedState !== null ? JSON.parse(storedState) : true; // Default to true if not set
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
