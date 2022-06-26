import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { userRoutes, adminRoutes } from "../../app/routes";
import { useAppSelector } from "Hooks/useRedux";
import { IUser } from "Types/IUser";
import s from './Navbar.module.css'
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
        <header className={s.header}>
            <nav className={s.navbar}>
                {userRoutes.map((route) => (
                    <Link key={route.link} className={s.navbarLlink} href={route.link}>
                        <a className={s.navbarItem}>{route.name}</a>
                    </Link>
                ))}
                {user.is.admin ? adminRoutes.map((route) => (
                    <Link key={route.link} className={s.navbarLink} href={route.link}>
                        <a className={s.navbarItem}>{route.name}</a>
                    </Link>
                )) : ''}
            </nav>


            <div className={s.hamburger}>
                <div className={s.hamburgerIcon} onClick={handleClick}>
                    <div className={!show ? s.hamburgerIconItem : `${s.hamburgerIconItem} ${s.unactive}`}></div>
                    <div className={!show ? s.hamburgerIconItem : `${s.hamburgerIconItem} ${s.unactive}`}></div>
                    <div className={!show ? s.hamburgerIconItem : `${s.hamburgerIconItem} ${s.unactive}`}></div>
                </div>
                <div className={show ? s.hamburgerList : s.hamburgerHide} onClick={() => setShow(false)}>
                    <div className={s.hamburgerWrapper}>
                        {userRoutes.map(route => (
                            <Link key={route.link} className={s.navbarLlink} href={route.link}>
                                <a className={s.hamburgerItem}>{route.name}</a>
                            </Link>
                        ))}
                        {user.is.admin ? adminRoutes.map((route) => (
                            <Link key={route.link} className={s.navbarLlink} href={route.link}>
                                <a className={s.hamburgerItem}>{route.name}</a>
                            </Link>
                        )) : ''}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
