import React from "react"
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '../Sidebar/Sidebar'

const Navbar = () => {
    return (
        <nav className="nav">
            <Sidebar right/>
            <ul className="navbar">
                <Link className="navbar-link" href="/profile"><a className="navbar-item">Profile</a></Link>
                <Link className="navbar-link" href="/admin/users"><a className="navbar-item">Users</a></Link>
            </ul>
        </nav>
    )
}

export default Navbar;