import React, {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import {useGuard} from "../../hooks/useGuard";
import {useRouter} from "next/router";
import {userRoutes, adminRoutes} from "../../app/routes";
import Sidebar from "Components/Sidebar/Sidebar";


const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    const userGuard = useGuard()
    const router = useRouter();
    const [adminRoute, setAdminRoute] = useState([])
    // useEffect(() => {
    //     if (userGuard) {
    //         setAdminRoute(...adminRoutes)
    // }}, [])
    // useEffect(() => {
    return (
        <nav className="navbar">
            <Sidebar/>
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
        </nav>
    )
}

export default Navbar;