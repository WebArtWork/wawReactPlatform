import React, {useEffect, useState} from 'react'
import {slide as Menu} from 'react-burger-menu'
import Link from 'next/link'
import {useGuard} from "../../hooks/useGuard";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {userRoutes, adminRoutes} from "../../app/routes";

export default props => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    // const [session, setSession] = useGuard('session')
    const userGuard = useGuard()
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter()
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('session'))
    //     if (user) setSession(user)
    //     if (!user) {
    //         router.push({pathname: '/'}, undefined, {shallow: true})
    //         removeCookie('userToken')
    //     } else if (!user.is.admin) {
    //         document.querySelector('.isAdmin').style.display = 'none';
    //     }
    // }, [])
    return (
        mounted &&
        <nav className="navbar">
            <Menu right>
                {userRoutes.map((route) => (
                    <Link key={route.link} className="navbar-link" href={route.link}>
                        <a className="navbar-item">{route.name}</a>
                    </Link>
                ))}
                {userGuard ? adminRoutes.map((route) => (
                    <Link key={route.link} className="navbar-link" href={route.link}>
                        <a className="navbar-item">{route.name}</a>
                    </Link>
                )) : ''}
            </Menu>
        </nav>
    );
};