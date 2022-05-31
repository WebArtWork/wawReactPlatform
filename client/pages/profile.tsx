import axios from 'axios'
import type {NextPage} from 'next'
import React, {Component, useEffect, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {userStorage} from "../hooks/userStorage.tsx";
import {userGuard} from "../hooks/userGuard";

const Profile: NextPage = () => {
    const [ user, setUser ] = userStorage('user')
    const [session, setSession] = userGuard('session')
    const [namer, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session'))
        if(!cookie.userToken) {
            localStorage.removeItem('session')
            router.push('/')
        }
    }, [])


    const logout = () => {
        removeCookie('userToken')
        localStorage.removeItem('session')
        router.push('/');
    }

    const getUserName = async () => {
        const users: any = await axios.get('/api/user/get/users')
        console.log(users.data[0])
        setName(users.data[0].name)
    }
    useEffect(()=>{
        getUserName()
    }, [])

    const userChange = (e: any) => {
        let data_id = e.target.name
        // if(data_id == "name"){
        //     setName(e.target.value)
        // }
        // else if(data_id == "bio"){
        //     setBio(e.target.value)
        // }
        // else if(data_id == 'number'){
        //     setPhone(e.target.value)
        // }
    }

    const userBio = (e: any) => {
        e.preventDefault()
        let data_id = e.target.name
        // if(data_id == "name"){
        //     setName(e.target.value)
        // }
        // else if(data_id == "bio"){
        //     setBio(e.target.value)
        // }
        // else if(data_id == 'number'){
        //     setPhone(e.target.value)
        // }
        let data = {
            name: namer,
            bio: bio,
            number: phone
        }
        const getUserStatus = axios.post('/api/user/bio', data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
        console.log(getUserStatus)

    }
    return (
        <div>
            <Navbar/>
            <div className="profile container w-card _pd">
                <div className="profile__header w-card__header">
                    <div>Profile Settings</div>
                    <div>
                        <div className="avatar _profile">
                            <img className="avatar__upload" src="" width={50} height={50}/>
                            <label className="avatar__upload">
                                <span className="material-symbols-outlined">edit</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="profile__body">
                    <div className="w-forms">
                        <span className="w-forms__title" >Name</span>
                        <input
                            className="w-forms__input"
                            type="text"
                            name="name"
                            name="name" 
                            defaultValue={namer}
                            placeholder="Your name"
                            onKeyUp={userChange}
                            onBlur={userBio}
                         />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                                maxLength={10}
                                type="tel" name="number"
                               placeholder="Phone number"
                            onKeyUp={userChange}
                               onBlur={userBio}/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name='bio'
                            onKeyUp={userChange}
                            onBlur={userBio}>
                        </textarea>
                    </div>
                    <div className=">profile__logout">

                        <button className="logout-button _danger" onClick={logout}>
                            <span className="material-symbols-outlined">logout</span>Logout

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;