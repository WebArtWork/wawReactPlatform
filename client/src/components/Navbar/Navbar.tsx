import React, {useEffect, useState} from "react"
import Link from 'next/link'
import {userRoutes, adminRoutes} from "../../app/routes";
import {useAppSelector} from "Hooks/useRedux";
import {IUser} from "Types/IUser";

const Navbar = () => {
    // const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    const user = useAppSelector<IUser>((state) => state.user.user);
    return (
        mounted &&
        <nav className="navbar">
            {userRoutes.map((route) => (
                <Link key={route.link} className="navbar-link" href={route.link}>
                    <a className="navbar-item">{route.name}</a>
                </Link>
            ))}
            {user.is.admin ? adminRoutes.map((route) => (
                <Link key={route.link} className="navbar-link" href={route.link}>
                    <a className="navbar-item">{route.name}</a>
                </Link>
            )) : ''}
        </nav>
    )
}

export default Navbar;
