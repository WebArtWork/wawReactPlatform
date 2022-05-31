import React, {useEffect} from "react"
import Link from 'next/link'
import Sidebar from '../Sidebar/Sidebar'
import {userGuard} from "../../hooks/userGuard";
import {userStorage} from "../../hooks/userStorage";

const Navbar = () => {
    const [session, setSession] = userGuard('session')
    const [user, setUser] = userStorage('user');
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        if (user) setSession(user)
        if (!user.is.admin) {
            document.querySelector('.admin').style.display = 'none';
        }
    }, [])

    return (
        <nav className="nav">
            <Sidebar right/>
            <ul className="navbar">
                <Link className="navbar-link" href="/profile">
                    <div className="navbar-item">Profile</div>
                </Link>
                <Link className="navbar-link" href="/admin/users">
                    <div className="navbar-item admin">Users</div>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;