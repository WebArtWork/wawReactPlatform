import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useGuard} from "../../hooks/useGuard";
import {useRouter} from "next/router";
import {userRoutes, adminRoutes} from "../../app/routes";

function Sidebar(props : any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    const userGuard = useGuard()
    const router = useRouter()

    return (
         <div></div>
            // <Menu right>
            //     {userRoutes.map((route) => (
            //         <Link key={route.link} className="navbar-link" href={route.link}>
            //             <a className="navbar-item">{route.name}</a>
            //         </Link>
            //     ))}
            //     {userGuard ? adminRoutes.map((route) => (
            //         <Link key={route.link} className="navbar-link" href={route.link}>
            //             <a className="navbar-item">{route.name}</a>
            //         </Link>
            //     )) : ''}
            // </Menu>
    );
};

export default Sidebar;