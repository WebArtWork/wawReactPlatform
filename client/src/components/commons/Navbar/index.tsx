import React, {FC, useEffect} from 'react';
import styles from './style.module.scss';
import Icon from "@Components/UI/Icon";
import Link from "next/link";
import routes from "@Config/routes.json";
import {useRouter} from "next/router";
import {useAppSelector} from "@Hooks/useTypedSelector";
import {useTheme} from "@Hooks/useTheme";
import Image from "next/image";

const Navbar: FC = () => {
    const [burger, setBurger] = React.useState(true);
    const router = useRouter();

    const {data: user, loading} = useAppSelector(state => state.user)
    const {theme, toggleTheme, ThemeType} = useTheme();

    useEffect(() => {
        // console.log("navbar", user)
    }, [user])

    // return <></>

    return (
        <header>
            <nav className={styles.nav}>
                <ul className={`${styles.navUl} container`}>
                    {routes?.public.map((route) => (
                        <li key={route.title} className={styles.navLi}>
                            <Link href={route.href}>
                                <a className={`${styles.navA} ${router.pathname === route.href && styles._activeLink}`}>
                                    <Icon name={route.icon}/>
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li className={`${styles.navLi} ${styles._burger}`}>
                        <a className={`${styles.navToggle} ${!burger && styles._active}`}
                           onClick={() => setBurger(!burger)}
                        >
                            <span className={styles.navToggleLine}></span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={`${styles.navBurger} ${!burger && styles._active}`}>
                <div className={styles.navBurgerList}>
                    <div className={styles.themeSwitch}>
                        <Icon
                            name={`${theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT}_mode`}
                            onClick={toggleTheme}
                        />
                    </div>
                    <a className={`${styles.navBurgerLink} ${styles.navBurgerUser}`}>
                        <Image
                            alt="Profile Picture"
                            className={styles.avatarImg}
                            height={50}
                            width={50}
                            src={user.thumb || "/assets/default.png"}
                        />
                        <div className={styles.name}>
                            {user.data.name || "Profile"}
                        </div>
                    </a>

                    {user.is.admin && routes.admin.map((route) => (
                        <Link href={route.href} key={route.href}>
                            <a className={styles.navBurgerLink}>
                                <Icon name={route.icon}/>
                                <span>Users</span>
                            </a>
                        </Link>
                    ))}

                </div>
            </div>
        </header>
    );
};

export default Navbar;