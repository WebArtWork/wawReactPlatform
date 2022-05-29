import React from "react"
import Link from 'next/link'
import Sidebar from '../Sidebar/Sidebar'
import {userStorage} from "../../hooks/userStorage";

const IsAdmin = () => {
    // if(!handleChange){
    //     return(
    //         <nav className="nav">
    //         <Sidebar right/>
    //         <ul className="navbar">
    //             <Link className="navbar-link" href="/profile"><a className="navbar-item">Profile</a></Link>
    //         </ul>
    //     </nav>
    //     )
    // }else{
    //     return(
    return(
            <nav className="nav">
            <Sidebar right/>
            <ul className="navbar">
                <Link className="navbar-link" href="/profile"><a className="navbar-item">Profile</a></Link>
                <Link className="navbar-link" href="/admin/users"><a className="navbar-item">Users</a></Link>
            </ul>
        </nav>
        )
   
        // )
    // }
}

const Navbar = () => {
    return (
        <IsAdmin/>
    )
}

export default Navbar;