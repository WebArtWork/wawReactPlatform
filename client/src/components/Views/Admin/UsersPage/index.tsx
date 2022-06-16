import React, {useEffect, useState} from 'react';
import {IUser} from "Types/IUser";
import {GetServerSideProps} from "next";
import {wrapper} from "Redux/store";
import {parseCookies} from "nookies";
import {getMe} from "@Api/auth";
import {setUser} from "Redux/userSlice";
import {fetchUsers, setIs} from "@Api/user";

interface UsersProps {
    userList: IUser[]
}

function Index({userList}:UsersProps) {
    const [users, setUsers] = useState<IUser[]>(userList);
    const {authToken} = parseCookies(null);


    const handleChange = async (user: IUser) => {
        user.is.admin = !user.is.admin;
        await setIs(user, authToken)

        // const updatedList = await fetchUsers(authToken);
        // setUsers(updatedList)

    }

    const createUser = () => {

    }

    const deleteUser = (user: IUser) => {

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
                        // type='text'
                        // className={inputError ? "non_valid_input user_email" : "user_email"}
                        // placeholder='Email'
                        // value={emailInput}
                        // onChange={(e) => setEmailInput(e.target.value)}
                        // required
                    >
                    </input>

                    <button onClick={createUser}>
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
                                            //    {user.is.admin ? checked : ''}
                                            // defaultChecked
                                               checked={user.is.admin}
                                        />
                                    </button>
                                </td>
                                <td>
                                    <button className='deleter' onClick={() => deleteUser(user)}>
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