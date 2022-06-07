import type {NextPage} from 'next'
import Navbar from '../../components/Navbar/Navbar'
import React, {Component, useEffect, useState} from 'react'
import axios from "axios";
import {useStorage} from '../../hooks/useStorage';
import {useGuard} from "../../hooks/useGuard";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const Users: NextPage = () => {
    // const [checked, setChecked]: any = useState(false);
    const [inputError, setInputError]: any = useState(false);
    // const [session, setSession] = useGuard('session')
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter()
    const [emailInput, setEmailInput] = useState('');
    // const [user, setUser] = useStorage('user');
    const [users, setUsers] = useState<any>([]);
    // const [admin, setAdmin] = useState<boolean>(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        // console.log(cookie.userToken)
        if (!cookie.userToken) {
            localStorage.removeItem('session')
            router.push({pathname: '/'}, undefined, {shallow: true})
        } else if (!user.is.admin) {
            router.push({pathname: '/'}, undefined, {shallow: true})
        }
    }, [])

    interface IUser {
        _id: string,
        thumb: string,
        is: { admin: boolean },
        email: string,
        reg_email: string,
        password: string,
        data: object
    }

    // const handleChange = async (id: any) => {
    //     const administrator: IUser = await axios.post('/api/users/set/admin/' + id).then(response => response.data )
    //         const arr = users.filter((user: IUser) => id !== user._id)
    //         setUsers([administrator, ...arr])
    // }

    const login = () => {
        console.log('user exist')
    }

    // const getUsers = async () => {
    //     const users : IUser[] = await axios.get('/api/users/get/users').then(response => response.data)
    //     setUsers(users)
    //     console.log(users)
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [admin])

    // useEffect(() => {
    //     if (user) {
    //         if (users.length) {
    //             setUsers([...users, user])
    //         } else {
    //             setUsers([user])
    //         }
    //     }
    // }, [user])

    const sign = async () => {
        const user = await axios.post('/api/user/sign', {
            email: emailInput,
        }).then(response => response.data)
        setUsers(user)
    }

    const createUser = async (e: any) => {
        e.preventDefault()
        let reg = /\S+@\S+\.\S+/;

        let address: any = document.getElementsByClassName('user_email');

        if (reg.test
        (address[0].value) == false) {
            setInputError(true);
        } else {
            setInputError(false);
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
    }

    // const deleteUser = async (id: string) => {
    //     const getUserDelete = await axios.delete('/api/users/delete/' + id,
    //     ).then(response => response.data)
    //     if (getUserDelete.success) {
    //         setUsers(users.filter((user: IUser) => id !== user._id))
    //     }
    // }
    
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
                            className={inputError ? "non_valid_input user_email" : "user_email"}
                            placeholder='Email'
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            required>
                        </input>

                        <button onClick={createUser}>
                             Create</button>
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
                                    <td>{user.email}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='admin'>
                                            <input type='checkbox'
                                                //    onChange={() => handleChange(user._id)}
                                                //    {user.is.admin ? checked : ''}
                                                // defaultChecked
                                                checked={user.is.admin}
                                                   
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='deleter'>
                                         {/* onClick={() => deleteUser(user._id)}> */}
                                            <img className='trash' src="https://img.icons8.com/ios/500/trash--v1.png" alt='delete'/>
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