import React from 'react';
import { FaHome, FaKeyboard, FaMapMarkerAlt, FaSignOutAlt, FaPowerOff, FaArrowDown, FaArrowUp, FaTable } from 'react-icons/fa';
import './NavBar.css';
import Item from './Item';

function SidebarItem({ icon, label, active }) {
    return (
        <div className={`sidebar-item ${active ? 'active' : ''}`}>
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
}

function NavBar() {
    return (
        <div className="app">
            {/* Main Content */}
            <div className="main-content">

                <Item />
                {/* Top Menu */}
                <div className="top-menu">
                    <div className="logo">Logo</div> {/* Add the logo */}
                    <div className="top-menu-items">
                        <button className="btn return">Return</button>
                        <button className="btn refund">Refund</button>
                        <button className="btn remarks">Remarks</button>
                        <button className="btn full">Full</button>
                        <button className="btn expenses">Expenses</button>
                        <button className="btn customer">Customer</button>
                        <button className="btn setting">Setting</button>
                        <button className="btn down">
                            <FaArrowDown /> Down
                        </button>
                        <button className="btn up">
                            <FaArrowUp /> Up
                        </button>
                        <button className="btn select-table">
                            <FaTable /> Select Table
                        </button>
                        <button className="btn new">New</button>
                        <button className="btn all">All</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <SidebarItem icon={<FaHome />} label="POS" active />
                    <SidebarItem icon={<FaKeyboard />} label="Sales" />
                    <SidebarItem icon={<FaMapMarkerAlt />} label="Location" />
                    <SidebarItem icon={<FaSignOutAlt />} label="Logout" />
                    <SidebarItem icon={<FaPowerOff />} label="Exit" />
                </div>


                {/* Status Bar */}
                <div className="status-bar">
                    <div>Thilina Ruwan</div>
                    <div>Royal Restaurant</div>
                    <div>{new Date().toLocaleString()}</div>
                    <div>Powered By Payshia.com</div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;