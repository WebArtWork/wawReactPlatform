import React, {useEffect} from "react"
import Link from 'next/link'
import Sidebar from '../Sidebar/Sidebar'
import {userGuard} from "../../hooks/userGuard";
import {userStorage} from "../../hooks/userStorage";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const Navbar = () => {
    const [session, setSession] = userGuard('session')
    const [user, setUser] = userStorage('user');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        console.log(cookie.userToken)
        if(!cookie.userToken || !user) {
            localStorage.removeItem('session')
            router.push('/')
        }
        else if (!user.is.admin) {
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