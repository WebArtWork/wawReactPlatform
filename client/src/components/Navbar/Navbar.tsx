import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { userRoutes, adminRoutes } from "../../app/routes";
import { useAppSelector } from "Hooks/useRedux";
import { IUser } from "Types/IUser";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    const user = useAppSelector<IUser>((state) => state.user.user);
    const handleClick = () => {
        setShow(!show)
    }
    return (
        mounted &&
        <header className="header">
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


            <div className="hamburger">
                <div className="hamburger__icon" onClick={handleClick}>
                    <div className={!show ? 'hamburger__icon-item' : 'hamburger__icon-item unactive'}></div>
                    <div className={!show ? 'hamburger__icon-item' : 'hamburger__icon-item unactive'}></div>
                    <div className={!show ? 'hamburger__icon-item' : 'hamburger__icon-item unactive'}></div>
                </div>

                <div className={show ? 'hamburger__list' : 'hamburger__hide'} onClick={() => setShow(false)}>
                    <div className="hamburger__wrapper">
                        {userRoutes.map(route => (
                            <Link key={route.link} className="navbar-link" href={route.link}>
                                <a className="hamburger-item">{route.name}</a>
                            </Link>
                        ))}
                        {user.is.admin ? adminRoutes.map((route) => (
                            <Link key={route.link} className="navbar-link" href={route.link}>
                                <a className="hamburger-item">{route.name}</a>
                            </Link>
                        )) : ''}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
