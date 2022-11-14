import React from 'react';
import { Link } from "react-router-dom";
import authUser from "../auth/AuthUser";

const Navbar = () => {

    const { getToken, logout } = authUser();

    const logoutUser = () => {
        logout();
    }

  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            { getToken()
            ?
            (<ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <span role="button" className='nav-link text-white' onClick={logoutUser}>Logout</span>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/Dashboard">Dashboard</Link>
                </li>
            </ul>)
            :
            (<ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/Register">Register</Link>
                </li>
            </ul>)
            }
        </nav>
    </div>
  )
}

export default Navbar