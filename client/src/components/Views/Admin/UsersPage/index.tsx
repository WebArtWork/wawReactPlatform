import React, {useState} from 'react';
import {IUser} from "Types/IUser";
import {parseCookies} from "nookies";
import {setIs, deleteUser, createUser} from "@Api/user";

interface UsersProps {
    userList: IUser[]
}

function Index({userList}:UsersProps) {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState<IUser[]>(userList);
    const {authToken} = parseCookies(null);
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
        <div className='w-card _pd'>
            <h1>Admin Users</h1>
            <div className='users_card'>
                <div>
                    <h2>Users</h2>
                </div>

                <p>New User</p>

                <div className='new_user'>
                    <input
                        className='user_email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button className={valid ? 'button' : 'button _disabled'}
                    disabled={!valid}
                    onClick={() => createUser(email, authToken)}>
                        Create
                    </button>
                </div>

                <div className='table'>
                    <table>
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length ? users.map((user: IUser) => (

                            <tr key={user._id}>
                                <td>
                                    {/* {user.img} */}
                                    {user.data?.name }
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='admin'>
                                        <input type='checkbox'
                                            onChange={() => handleChange(user)}
                                                onClick={() => user.is.admin ? true : false}
                                            // defaultChecked
                                            checked={user.is.admin}
                                        />
                                    </button>
                                </td>
                                <td>
                                    <button className='deleter' onClick={() => handleDeleteUser(user)}>
                                        <img className='trash' src="https://img.icons8.com/ios/500/trash--v1.png"
                                            alt='delete'/>
                                    </button>
                                </td>
                            </tr>)) : <tr>
                            <td colSpan={4}>No users</td>
                        </tr>}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Index;
