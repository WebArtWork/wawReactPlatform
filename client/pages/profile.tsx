import axios from 'axios'
import type {NextPage} from 'next'
import React, { useEffect, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {useStorage} from "../hooks/useStorage";
import {Modal} from "../modal/Modal";
import {useGuard} from "../hooks/useGuard";
import UserService from "../services/user.service";
import RenderService from "../services/render.service";

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
    const [user, setUser] = useStorage<User>('user', null)
    const userGuard = useGuard()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [show, setShow] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const [img, setImg] = useState('');
    const router = useRouter();

    const US = new UserService();
    const rs = new RenderService()

    useEffect(() => {
        if(userGuard == null) {
            router.push({pathname: '/'})
        }
        else if(!cookie.userToken) {
            setUser({})
            router.push('/')
        }
    }, [])

    const getUserStatus = async () =>{
        let user_status = await axios.get('/api/user/get').then(response => response.data)
        let locale: string | any = localStorage.getItem('user')
        let store = JSON.parse(locale)
        let i;
        for(i = 0; i <= user_status.length; i++){
            if(store._id == user_status[i]._id){
                let user_info = user_status[i]
                setName(user_info.name)
                setPhone(user_info.phone)
                setBio(user_info.bio)
                return
            }
        }
    }

    const logout = () => {
        removeCookie('userToken')
       setUser({})
        router.push('/');
    }

    const setUserData = async () => {
        const userData = {
            _id: user._id,
            name: name,
            data: {
                bio: bio,
                phone: phone
            }
        }

        US.update(userData);
        setName(US.user.name)
        setPhone(US.user.phone)
        setBio(US.user.bio)
    }
    useEffect(()=>{
        getUserStatus()
    }, [])

    const userBio = async (e: any) => {
        const attr = e.target.getAttribute('name')
        
        switch(attr){
            case 'name':
                setName(e.target.value)
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'bio':
                setBio(e.target.value);
                break;
        }
        setUserData();
    }
    
    return (
        <div>
            <Navbar />
            <div className="profile container w-card _pd">
                <div className="profile__header w-card__header">
                    <div>Profile Settings</div>
                    <div>
                        <form className="avatar _profile">
                        <img className="avatar__upload" id="blah" src={img} style={{width: '58px', height: '58px'}}/>
                            <input type="file" accept="png" id="image" className="avatar__upload" 
                            //  onChange={uploadFile}
                              name="img"/>
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
                            defaultValue={name}
                            placeholder="Your name"
                            onChange={userBio}
                         />

                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                               maxLength={10}
                               type="tel"
                               name="phone"
                                defaultValue={phone}
                                placeholder="Phone number"
                                onBlur={userBio}
                                />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name='bio'
                            maxLength={100}
                            defaultValue={bio}
                            onBlur={userBio}
                            >
                        </textarea>
                    </div>
                    <div className=">profile__logout">
                        <button type="button" className="w-btn _primary" onClick={() => setShow(true)}>Change password</button>
                        <Modal onClose={() => setShow(false)} show={show}/>
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