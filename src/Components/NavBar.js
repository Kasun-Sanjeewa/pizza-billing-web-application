import React from 'react';
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

    const pageHandler = () => {
        isTrueHandler(false);
    };

    // Function to toggle fullscreen
    const toggleFullScreen = () => {
        const elem = document.documentElement; // Select the entire document for fullscreen
        if (!document.fullscreenElement) {
            // Enter fullscreen mode
            elem.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else {
            // Exit fullscreen mode
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit fullscreen: ${err.message} (${err.name})`);
            });
        }
    };

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload(); // Reload the page
    };

    // Scroll the page up
    const scrollUp = () => {
        window.scrollBy({ top: -100, behavior: 'smooth' }); // Scroll up by 100px
    };

    // Scroll the page down
    const scrollDown = () => {
        window.scrollBy({ top: 100, behavior: 'smooth' }); // Scroll down by 100px
    };

    return (
        <div className="app">
            {/* Main Content */}
            <div className="main-content">
                <HeroPage />
                {/* Top Menu */}
                <div className="top-menu">
                    <div className="logo">PizzaHut</div> {/* Add the logo */}
                    <div className="top-menu-items">
                        <button className="btn down" onClick={scrollDown}>
                            <i className="fa-solid fa-arrows-down-to-line" />
                            <p>Down</p>
                        </button>
                        <button className="btn up" onClick={scrollUp}>
                            <i className="fa-solid fa-arrows-up-to-line" />
                            <p>Up</p>
                        </button>
                        <button className="btn full" onClick={toggleFullScreen}><i className="fa-solid fa-expand" />Full</button>
                        <button className="btn new" onClick={refreshPage}><i className="fa-solid fa-arrows-rotate" />New</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <SidebarItem icon={<FaHome />} label="POS" active />
                    <button className='Admin-btn' onClick={pageHandler}>
                        <SidebarItem icon={<FaUserShield />} label="Admin" />
                    </button>
                    <SidebarItem icon={<FaSignOutAlt />} label="Logout" />
                    <SidebarItem icon={<FaPowerOff />} label="Exit" />
                </div>

                {/* Status Bar */}
                <div className="status-bar">
                    <div>Kasun Sanjeewa</div>
                    <div>Pizza Restaurant</div>
                    <div>{new Date().toLocaleString()}</div>
                    <div>Powered By KSgroup.com</div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
