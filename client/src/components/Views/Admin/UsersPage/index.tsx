import React, { useState } from 'react';
import { IUser } from "Types/IUser";
import { parseCookies } from "nookies";
import { setIs, deleteUser, createUser } from "@Api/user";
import s from './Users.module.css';

interface UsersProps {
    userList: IUser[]
}

function Index({ userList }: UsersProps) {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState<IUser[]>(userList);
    const { authToken } = parseCookies(null);
    const valid =
        RegExp('^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$')
            .test(email);

    const handleChange = async (user: IUser) => {
        user.is.admin = !user.is.admin;
        await setIs(user, authToken);
    }

    const handleDeleteUser = async (user: IUser) => {
        const data = await deleteUser(user, authToken);
    }

    return (
        <div className={s.container}>
            <div className={s.card}>
                <h1 className={s.title}>Admin Users</h1>
                <div className={s.userCard}>
                    <div>
                        <h2>Users</h2>
                    </div>

                    <p className={s.descr}>New User</p>

                    <div className={s.newUser}>
                        <input
                            className={s.userEmail}
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button className={valid ? s.button : `${s.disabled} ${s.button}`}
                            disabled={!valid}
                            onClick={() => createUser(email, authToken)}>
                            Create
                        </button>
                    </div>

                    <div className={s.tableWrap}>
                        <table className={s.table}>
                            <thead>
                                <tr>
                                    <th className={s.th}>User</th>
                                    <th className={s.th}>Email</th>
                                    <th className={s.th}>Admin</th>
                                    <th className={s.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length ? users.map((user: IUser) => (

                                    <tr key={user._id}>
                                        <td className={s.td}>
                                            {user.data?.name}
                                        </td>
                                        <td className={s.td}>{user.email}</td>
                                        <td className={s.td}>
                                            <button className={s.admin}>
                                                <input type='checkbox'
                                                    onChange={() => handleChange(user)}
                                                    onClick={() => user.is.admin ? true : false}
                                                    checked={user.is.admin}
                                                />
                                            </button>
                                        </td>
                                        <td className={s.td}>
                                            <span className={s.delete} onClick={() => handleDeleteUser(user)}>
                                                <img className={s.trash} src="https://img.icons8.com/ios/500/trash--v1.png"
                                                    alt='delete' />
                                            </span>
                                        </td>
                                    </tr>)) : <tr>
                                    <td colSpan={4}>No users</td>
                                </tr>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
