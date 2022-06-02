import React, {useEffect} from 'react'
import {slide as Menu} from 'react-burger-menu'
import Link from 'next/link'
import {userGuard} from "../../hooks/userGuard";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

export default props => {
    const [session, setSession] = userGuard('session')
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        if (user) setSession(user)
        if (!user) {
            router.push({pathname: '/'}, undefined, {shallow: true})
            removeCookie('userToken')
        } else if (!user.is.admin) {
            document.querySelector('.isAdmin').style.display = 'none';
        }
    }, [])
    return (
        <Menu right>
            <Link className="menu-item" href="/admin/users">
                <div className='isAdmin'>Users</div>
            </Link>

            <Link className="menu-item" href="/profile">
                <div>Profile</div>
            </Link>
        </Menu>
    );
};