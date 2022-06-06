import axios from 'axios'
import type {NextPage} from 'next'
import React, {Component, useEffect, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {useStorage} from "../hooks/useStorage";
import {Modal} from "../modal/Modal";
import {useGuard} from "../hooks/useGuard"

interface User {
    _id: string;
    email: string;
    thumb: string;
    is: {
        admin: boolean;
    };
    token: string;
}

const Profile: NextPage = () => {
    const [user, setUser] = useStorage<User | null>('user', null)
    const userGuard = useGuard()
    const [namer, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [show, setShow] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter();

    useEffect(() => {
        if(userGuard == null) {
            router.push({pathname: '/'})
        }

        // const user = JSON.parse(localStorage.getItem('session'))
        // if (!cookie.userToken) {
        //     localStorage.removeItem('session')
        //     router.push({pathname: '/'}, undefined, {shallow: true})
        // }
    }, [])
    console.log(userGuard)

    const logout = () => {
        removeCookie('userToken')
        router.push({pathname: '/'}, undefined, {shallow: true})
    }
    //
    // const getUserName = async () => {
    //     const users: any = await axios.get('/api/user/get/users')
    //     console.log(users.data[0])
    //     setName(users.data[0].name)
    // }
    // useEffect(() => {
    //     getUserName()
    // }, [])
    //
    // const userChange = (e: any) => {
    //     let data_id = e.target.name
    //     // if(data_id == "name"){
    //     //     setName(e.target.value)
    //     // }
    //     // else if(data_id == "bio"){
    //     //     setBio(e.target.value)
    //     // }
    //     // else if(data_id == 'number'){
    //     //     setPhone(e.target.value)
    //     // }
    // }
    //
    // const userBio = (e: any) => {
    //     e.preventDefault()
    //     let data_id = e.target.name
    //     // if(data_id == "name"){
    //     //     setName(e.target.value)
    //     // }
    //     // else if(data_id == "bio"){
    //     //     setBio(e.target.value)
    //     // }
    //     // else if(data_id == 'number'){
    //     //     setPhone(e.target.value)
    //     // }
    //     let data = {
    //         name: namer,
    //         bio: bio,
    //         number: phone
    //     }
    //     const getUserStatus = axios.post('/api/user/bio', data, {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(response => response.data)
    //     console.log(getUserStatus)
    //
    // }
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
                        <span className="w-forms__title">Name</span>
                        <input
                            className="w-forms__input"
                            type="text"
                            name="name"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                               maxLength={10}
                               type="tel" name="number"
                               placeholder="Phone number" />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name='bio'>
                        </textarea>
                    </div>
                    <button type="button" className="w-btn _primary" onClick={() => setShow(true)}>Change password</button>
                    <Modal onClose={() => setShow(false)} show={show}/>
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