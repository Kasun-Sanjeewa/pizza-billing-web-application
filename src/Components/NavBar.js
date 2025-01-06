import React, { useEffect, useState } from 'react';
import { FaHome, FaSignOutAlt, FaPowerOff, FaUserShield } from 'react-icons/fa';
import './CSS/NavBar.css';
import HeroPage from './HeroPage';

function SidebarItem({ icon, label, active }) {
    return (
        <div className={`sidebar-item ${active ? 'active' : ''}`}>
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
}

function NavBar({ isTrueHandler }) {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [showExitPopup, setShowExitPopup] = useState(false);

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

    const refreshPage = () => {
        window.location.reload();
    };

    const scrollUp = () => {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    };

    const scrollDown = () => {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleExit = () => {
        setShowExitPopup(true);
    };

    const confirmExit = () => {
        // Close the app logic
        window.close();
    };

    const cancelExit = () => {
        setShowExitPopup(false);
    };


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
