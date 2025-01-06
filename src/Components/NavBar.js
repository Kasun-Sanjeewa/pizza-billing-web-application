import React, { useEffect, useState } from 'react';
import { FaHome, FaSignOutAlt, FaPowerOff, FaUserShield } from 'react-icons/fa';
import './CSS/NavBar.css';
import HeroPage from './HeroPage';

// SidebarItem: Renders an individual item in the sidebar with icon and label
function SidebarItem({ icon, label, active }) {
    return (
        <div className={`sidebar-item ${active ? 'active' : ''}`}>
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
}

// NavBar: Main navigation component for the app
function NavBar({ isTrueHandler }) {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [showExitPopup, setShowExitPopup] = useState(false);

    // Handler to switch to the admin page
    const pageHandler = () => {
        isTrueHandler(false);
    };

    const toggleFullScreen = () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit fullscreen: ${err.message} (${err.name})`);
            });
        }
    };

    // Refreshes the page to reload the app
    const refreshPage = () => {
        window.location.reload();
    };

    // Smoothly scrolls the page up
    const scrollUp = () => {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    };

    // Smoothly scrolls the page down
    const scrollDown = () => {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    };

    // Updates the current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Shows the exit confirmation popup
    const handleExit = () => {
        setShowExitPopup(true);
    };

    // Confirms exit and closes the app (works in environments where window.close() is allowed)
    const confirmExit = () => {
        // Close the app logic
        window.close();
    };

    // Cancels the exit confirmation popup
    const cancelExit = () => {
        setShowExitPopup(false);
    };

    // Logs out the user by clearing local state and reloading the app
    const handleLogout = () => {
        // Clear any relevant state or localStorage items
        localStorage.removeItem('isTrue');
        // Log out by setting authentication state to false
        isTrueHandler(true);  // Optionally reset `isTrue` value if needed
        window.location.reload();  // Reload to trigger re-render of `App`
    };

    return (
        <div className="app">
            <div className="main-content">
                <HeroPage />
                <div className="top-menu">
                    <div className="logo">PizzaHut</div>
                    <div className="top-menu-items">
                        <button className="btn down" onClick={scrollDown}>
                            <i className="fa-solid fa-arrows-down-to-line" />
                            <p>Down</p>
                        </button>
                        <button className="btn up" onClick={scrollUp}>
                            <i className="fa-solid fa-arrows-up-to-line" />
                            <p>Up</p>
                        </button>
                        <button className="btn full" onClick={toggleFullScreen}>
                            <i className="fa-solid fa-expand" />
                            Full
                        </button>
                        <button className="btn new" onClick={refreshPage}>
                            <i className="fa-solid fa-arrows-rotate" />
                            New
                        </button>
                    </div>
                </div>

                <div className="sidebar">
                    <SidebarItem icon={<FaHome />} label="POS" active />
                    <button className="Admin-btn" onClick={pageHandler}>
                        <SidebarItem icon={<FaUserShield />} label="Admin" />
                    </button>
                    <button onClick={handleLogout} className='logout-btn'>
                        <SidebarItem icon={<FaSignOutAlt />} label="Logout" />
                    </button>

                    <button className="Exit-btn" onClick={handleExit}>
                        <SidebarItem icon={<FaPowerOff />} label="Exit" />
                    </button>
                </div>

                <div className="status-bar">
                    <div className="user-name">
                        <i className="fa-solid fa-user" />
                        Kasun Sanjeewa
                    </div>
                    <div className='location'><i className="fa-solid fa-location-dot" />Pizza Restaurant</div>
                    <div className='time'><i className="fa-solid fa-clock" />{currentTime}</div>
                    <div className='copyright'><i className="fa-solid fa-copyright" />Powered By KSgroup.com</div>
                </div>
            </div>

            {showExitPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Do you really need to exit from POS?</h2>
                        <div className="popup-buttons">
                            <button className="btn cancel" onClick={cancelExit}>
                                No
                            </button>
                            <button className="btn confirm" onClick={confirmExit}>
                                Yes! Close App
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;
