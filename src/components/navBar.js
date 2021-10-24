import '../css/navCss.css'
import {Link} from 'react-router-dom'
import React from 'react'

function NavBar() {
    return (
        <div className="header">
            <Link to="/">
                web chat
            </Link>
            <div className="header-links">
            <Link to="/service">service</Link>
            <Link to="/login">login</Link>
            <Link to="/signup">signup</Link>
            <Link to="/contact">contact</Link>
            </div>
        </div>
    )
}

export default NavBar
