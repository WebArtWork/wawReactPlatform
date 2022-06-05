import axios from 'axios'
import type {NextPage} from 'next'
import React, {Component, useEffect, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import { useGuard } from '../hooks/useGuard';
import {useStorage} from '../hooks/useStorage';

const Profile: NextPage = () => {
    const host = 'http://localhost';
    const port = '3000';
    const [session, setSession] = useGuard('session')
    const [namer, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [user, setUser] = useStorage('user');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const router = useRouter();
    const [img, setImg] = useState('');

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
        let locale: any = localStorage.getItem('session')
        let store = JSON.parse(locale)
        let i
        let arr = users.data
        for(i=0; i <= arr.length; i++){
            if(arr[i]?._id == store._id){
                setName(users.data[i].name)
                setPhone(users.data[i].phone)
                setBio(users.data[i].bio)
            }
        }
    }
    async function uploadFile(event: any) {
        let photos = event.currentTarget
        let formData = new FormData();
    
        formData.append('photo', photos?.files[0]);
        const result = await sendFile(formData);
        console.log(photos.files[0])
        event.preventDefault();
    }
    
    async function sendFile(data: any) {
        let dt = data
        let locale: any = localStorage.getItem('session')
        let store = JSON.parse(locale)
        const result = await axios.post(`api/user/uploads/` + store._id, dt);
        console.log(result)
    }
    async function Get(){
        let locale: any = localStorage.getItem('session')
        let store = JSON.parse(locale)
        let img = await axios.post('api/user/get/image/' + store._id).then(response => response)
        let src = img.data.image
        setImg(src)
    }
    
    useEffect(()=>{
        getUserName()
        Get()
    }, [])

    const userBio = async (e: any) => {
        const attr = e.currentTarget.getAttribute('name')
        let data

        if(attr == 'name'){
            data = {
                name: e.target.value
            }
        }
        else if(attr == 'number'){
            data = {
                phone: e.target.value
            }
        }
        else if (attr == 'bio'){
            data = {
                bio: e.target.value
            }
        } 
        
        let locale: any = localStorage.getItem('session')
        let store = JSON.parse(locale)
        console.log(store._id)
        let id = store._id
        const getUserStatus = await axios.post('/api/user/bio/' + id, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
        console.log(getUserStatus.data.success)
    }
    
    return (
        <div>
            <Navbar/>
            <div className="profile container w-card _pd">
                <div className="profile__header w-card__header">
                    <div>Profile Settings</div>
                    <div>
                        <form className="avatar _profile">
                        <img className="avatar__upload" id="blah" src={img} style={{width: '58px', height: '58px'}}/>
                            <input type="file" accept="png" id="image" className="avatar__upload"  onChange={uploadFile} name="img"/>
                                <span className="material-symbols-outlined">edit</span>
                        </form>
                    </div>
                </div>
                <div className="profile__body">
                    <div className="w-forms">
                        <span className="w-forms__title" >Name</span>
                        <input
                            className="w-forms__input"
                            type="text"
                            name="name"
                            defaultValue={namer}
                            placeholder="Your name"
                            onBlur={userBio}
                         />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                                maxLength={10}
                                defaultValue={phone}
                                type="tel"
                                name="number"
                                placeholder="Phone number"
                                onBlur={userBio}/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name='bio'
                            defaultValue={bio}
                            maxLength={100}
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