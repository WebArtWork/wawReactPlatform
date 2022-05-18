import React from "react";
import Link from 'next/link'

const Navbar = () => {
    return (
        <ul className="navbar">
            <Link className="navbar-link" href="/"><a className="navbar-item">Home</a></Link>
            <Link  className="navbar-link" href="/profile"><a className="navbar-item">Profile</a></Link>
            <Link className="navbar-link" href="/admin/users"><a className="navbar-item">Users</a></Link>
        </ul>
    )
}

export default Navbar;