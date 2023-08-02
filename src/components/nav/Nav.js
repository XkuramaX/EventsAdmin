import React from 'react'
import { Link } from 'react-router-dom'
import App from '../../App'

function Nav({Logout}) {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admin Home</div>
            </Link>
            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link className="nav-link" to="/profile">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>My Profile</span></Link>
            </li>

            
            <hr className="sidebar-divider"/>
            
            <li className="nav-item">
                <Link className="nav-link" to="/events">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Events</span>
                </Link>
            </li>
            { user.isAdmin || user.isSuper?<>
            <li className="nav-item">
                <Link className="nav-link" to="/members">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Members</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/types">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>types</span>
                </Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" to="/images">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Images</span>
                </Link>
            </li></>:<></>
}
            <li className="nav-item">
                <Link className="nav-link" onClick={Logout} to="/">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Logout</span>
                </Link>
            </li>
            
        </ul>
    )
}

export default Nav
