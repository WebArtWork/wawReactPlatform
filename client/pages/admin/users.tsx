import type {NextPage} from 'next'
import Navbar from '../../components/Navbar/Navbar'
import React, {Component, useEffect, useState} from 'react'
import axios from "axios";
import {userStorage} from "../../hooks/userStorage";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {userGuard} from "../../hooks/userGuard";

const Users: NextPage = () => {
    const router = useRouter()
    const [checked, setChecked]: any = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        console.log(checked)
        localStorage.setItem('key', checked)
    }

    interface IUser {
        _id: string,
        thumb: string,
        is: { admin: boolean },
        email: string,
        reg_email: string,
        password: string,
        data: object
    }

    const [emailInput, setEmailInput] = useState('');
    const [user, setUser] = userStorage('user');
    const [users, setUsers] = useState<any>();
    const [session, setSession] = userGuard('session')
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])

    console.log(cookie.userToken)
    const login = () => {
        console.log('user exist')
    }
    const getUsers = async () => {
        const users: any = await axios.get('/api/user/get/users')
        setUsers(users.data)
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        if (user) setSession(user)
        if (!user) {
            router.push('/')
            removeCookie('userToken')
        }
        if (!user.is.admin) {
            router.push('/profile')
        }
    }, [])

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (user) {
            if (users.length) {
                setUsers([...users, user])
            } else {
                setUsers([user])
            }
        }
    }, [user])

    const sign = async () => {
        const user = await axios.post('/api/user/sign', {
            email: emailInput,
        }).then(response => response.data)
        setUser(user)
    }

    const createUser = async (e: any) => {
        e.preventDefault()
        const getUserStatus = await axios.post('/api/user/status', {
            email: emailInput
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then((response) => {

            return response.data
        })
        if (getUserStatus.email) {
            login()

        } else {
            sign()
        }


    }

    const deleteUser = async (id: string) => {

        const getUserDelete = await axios.delete('/api/user/delete/' + id,
        ).then(response => response.data)
        if (getUserDelete.success) {
            setUsers(users.filter((user: IUser) => id !== user._id))
        }


    }
    return (
        <div>
            <Navbar/>
            <div className='w-card _pd'>
                <h1>Admin Users</h1>
                <div className='users_card'>
                    <div>
                        <h2>Users</h2>
                    </div>

                    <p>New User</p>

                    <div className='new_user'>
                        <input
                            type='text'
                            className='user_email'
                            placeholder='Email'
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}>
                        </input>

                        <button onClick={createUser}>Create</button>
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
                            {users?.length ? users.map((user: IUser) => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='admin'>
                                            <input type='checkbox'
                                                   onChange={handleChange}
                                            ></input>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='deleter' onClick={() => deleteUser(user._id)}>
                                            <i className="fi fi-rr-trash">delete</i>
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
        </div>

    )
}

export default Users;