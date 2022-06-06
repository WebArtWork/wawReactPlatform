import React, {useEffect} from "react"
import Link from 'next/link'
import Sidebar from '../Sidebar/Sidebar'
import {useGuard} from "../../hooks/useGuard";
import {useStorage} from "../../hooks/useStorage";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const Navbar = () => {
    const [session, setSession] = useGuard('session')
    const [user, setUser] = useStorage('user');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        // console.log(cookie.userToken)
        if(!cookie.userToken || !user) {
            localStorage.removeItem('session')
            router.push({pathname: '/'}, undefined, {shallow: true})

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