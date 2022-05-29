import axios from 'axios'
import type {NextPage} from 'next'
import React, {Component, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {useRouter} from "next/router";
import {useStorage} from "../hooks/useStorage";
import {useCookies} from "react-cookie";



const Profile: NextPage = () => {
    const [namer, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const [user, setUser] = useStorage('user');
    const router = useRouter();
    const logout = () => {
        removeCookie('userToken')
        router.push('/');
    }

    const userChange = (e: any) => {
        let data_id = e.target.name
        if(data_id == "name"){
            setName(e.target.value)
            console.log(namer)
        }
        else if(data_id == "bio"){
            setBio(e.target.value)
            console.log(bio)
        }
        else if(data_id == 'number'){
            setPhone(e.target.value)
            console.log(phone)
        }
    }

    const userBio = (e: any) => {
        e.preventDefault()
        let data_id = e.target.name
        if(data_id == "name"){
            setName(e.target.value)
            console.log(namer)
        }
        else if(data_id == "bio"){
            setBio(e.target.value)
        }
        else if(data_id == 'number'){
            setPhone(e.target.value)
        }
        let data = {
            name: namer,
            bio: bio,
            number: phone
        }
        const getUserStatus = axios.post('/api/user/status', data, {
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
                            placeholder="Your name"
                            // defaultValue={formValue.nameInput}
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
                            //    defaultValue={formValue.numberInput}
                            onKeyUp={userChange}
                               onBlur={userBio}/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea 
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name='bio'
                            // defaultValue={formValue.bioInput}
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