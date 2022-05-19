import React from 'react'
import {stack as Menu} from 'react-burger-menu'
import Link from 'next/link'

export default props => {
    return (
        <Menu right>
            <Link className="menu-item" href="/admin/users">
                <a>Users</a>
            </Link>

            <Link className="menu-item" href="/profile">
                <a>Profile</a>
            </Link>
        </Menu>
    );
};