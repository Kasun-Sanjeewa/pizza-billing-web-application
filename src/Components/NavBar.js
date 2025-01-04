import React from 'react';
import { FaHome, FaSignOutAlt, FaPowerOff, FaArrowDown, FaArrowUp, FaUserShield } from 'react-icons/fa';
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

function NavBar({ isTrueHandler, items }) {

    const pageHandler = () => {
        isTrueHandler(false);
    }
    return (
        <div className="app">
            {/* Main Content */}
            <div className="main-content">

                <HeroPage items={items} />
                {/* Top Menu */}
                <div className="top-menu">
                    <div className="logo">PizzaHut</div> {/* Add the logo */}
                    <div className="top-menu-items">

                        <button className="btn down">
                            <FaArrowDown /> Down
                        </button>
                        <button className="btn up">
                            <FaArrowUp /> Up
                        </button>

                        <button className="btn return">Return</button>
                        <button className="btn full">Full</button>
                        <button className="btn expenses">Expenses</button>
                        <button className="btn customer">Customer</button>


                        <button className="btn new">New</button>
                        <button className="btn all">All</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <SidebarItem icon={<FaHome />} label="POS" active />
                    <button className='Admin-btn' onClick={pageHandler}><SidebarItem icon={<FaUserShield />} label="Admin" /></button>
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
