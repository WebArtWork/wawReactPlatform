import React, {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import Sidebar from '../Sidebar/Sidebar'
import {useGuard} from "../../hooks/useGuard";
import {useRouter} from "next/router";
import {userRoutes, adminRoutes} from "../../app/routes";

const Navbar = () => {
    const userGuard = useGuard()
    const router = useRouter();

    const [adminRoute, setAdminRoute] = useState([])
    useEffect(() => {
        if(userGuard) {
            setAdminRoute(...adminRoutes)
        }
    },[])

    // useEffect(() => {

        // const user = JSON.parse(localStorage.getItem('session'))
        // console.log(cookie.userToken)
        // if(!cookie.userToken || !user) {
        //     localStorage.removeItem('session')
        //     router.push({pathname: '/'}, undefined, {shallow: true})
        //
        // }
        // else if (!user.is.admin) {
        //     document.querySelector('.admin').style.display = 'none';
        // }
    // }, [])
    return (
        <nav className="nav">
            <Sidebar right/>
            <ul className="navbar">
                {userRoutes.map((route) => (
                    <Link key={route.link} className="navbar-link" href={route.link}>
                        <span className="navbar-item">{route.name}</span>
                    </Link>
                ))}
                {typeof window !== 'undefined' && userGuard ? adminRoutes.map((route) => (
                    <Link key={route.link} className="navbar-link" href={route.link}>
                        <span className="navbar-item">{route.name}</span>
                    </Link>
                )) : ''}

            </ul>
        </nav>
    )
}

export default Navbar;