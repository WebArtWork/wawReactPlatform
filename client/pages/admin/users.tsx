import type {NextPage} from 'next'
import Navbar from '../../components/Navbar/Navbar'
import React, {Component, useEffect, useState} from 'react'
import axios from "axios";
import { useStorage } from '../../hooks/useStorage';
const Users: NextPage = () => {
    const [checked, setChecked]: any = useState(false);
    
    const handleChange = () => {
        setChecked(!checked);
        console.log(checked)
        localStorage.setItem('key', checked)
      }

    const [emailInput, setEmailInput] = useState('');
    const [ user, setUser ] = useStorage('user');

    const login = () => {
        console.log('user exist')
        
    }
    const ass = async () => {
        const axx = await axios.get('/api/user/get/users')
        console.log(axx)
    }
    useEffect(()=>{
        ass()
    }, [])
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
           console.log(response)
           return response.data
        })
        if (getUserStatus.email) {
            login()
            
        } else {
            sign()
        }
        
    }
    
    const deleteUser = async (e: any) => {
        e.preventDefault()
        const getUserDelete = await axios.delete('/api/user/status', 
        ).then(response => response.data)
        console.log(getUserDelete)
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
                                <tr>
                                    <td>qwe</td>
                                    <td>qwe</td>
                                    <td>
                                        <button className='admin'>
                                            <input type='checkbox'
                                            onChange={handleChange}
                                            ></input>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={deleteUser}>
                                        <i className="fi fi-rr-trash">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
         </div>
    </div>

    )
}

export default Users;
