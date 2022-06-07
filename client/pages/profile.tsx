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

const Profile: NextPage = () => {
    // const host = 'http://localhost';
    // const port = '3000';
    // const [session, setSession] = useGuard('session')
    const [user, setUser] = useStorage<User | null>('user', null)
    const userGuard = useGuard()
    const [namer, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [show, setShow] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['userToken'])
    const [img, setImg] = useState('');
    const router = useRouter();

    interface User {
        _id: string;
        email: string;
        thumb: string;
        is: {
            admin: boolean;
        };
        token: string;
    }    


    useEffect(() => {
        if(userGuard == null) {
            router.push({pathname: '/'})
        const user = JSON.parse(localStorage.getItem('user'))
        if(!cookie.userToken) {
            localStorage.removeItem('user')
            router.push('/')
        }
        // const user = JSON.parse(localStorage.getItem('session'))
        // if (!cookie.userToken) {
        //     localStorage.removeItem('session')
        //     router.push({pathname: '/'}, undefined, {shallow: true})
        // }
    }}, [])
    //
    // const userChange = (e: any) => {
    //     let data_id = e.target.name
    //     if(data_id == "name"){
    //         setName(e.target.value)
    //     }
    //     else if(data_id == "bio"){
    //         setBio(e.target.value)
    //     }
    //     else if(data_id == 'number'){
    //         setPhone(e.target.value)
    //     }
    // }

    //     const getUserStatus = axios.post('/api/user/bio', data, {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(response => response.data)
    //     console.log(getUserStatus)
    //
    // }

    const logout = () => {
        removeCookie('userToken')
        localStorage.removeItem('user')
        router.push('/');
    }

    const getUserName = async () => {
        let locale: any = localStorage.getItem('session')
        let store = JSON.parse(locale)
        const user = await axios.get(`/api/user/update/` + store._id).then(response => response.data)
        setName(user.name)
        setPhone(user.phone)
        setBio(user.bio)
    }

    // async function uploadFile(event: any) {
    //     let photos = event.currentTarget
    //     let formData = new FormData();
    
    //     formData.append('photo', photos?.files[0]);
    //     const result = await sendFile(formData);
    //     // console.log(photos.files[0])
    //     event.preventDefault();
    // }
    
    // async function sendFile(data: any) {
    //     let dt = data
    //     let locale: any = localStorage.getItem('session')
    //     let store = JSON.parse(locale)
    //     const result = await axios.post(`api/users/uploads/` + store._id, dt);
    //     // console.log(result)
    // }

    // async function Get(){
    //     let locale: any = localStorage.getItem('session')
    //     let store = JSON.parse(locale)
    //     let img = await axios.post('api/users/get/image/' + store._id).then(response => response)
    //     let src = img.data.image
    //     setImg(src)
    // }
    
    useEffect(()=>{
        getUserName()
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
    }

    // update(){
    //     this.us.user.name = input.name.value;
    //     this.us.user.data.bio = input.bio.value;
    //     this.us.user.data.phone = input.phone.value;
    //     this.us.update();
    //   }
        
        // let locale: any = localStorage.getItem('session')
        // let store = JSON.parse(locale)
        // // console.log(store._id)
        // let id = store._id
        // const getUserStatus = await axios.post('/api/users/bio/' + id, data, {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         'Content-Type': 'application/json',
        //     }
        // }).then(response => response.data)

        // console.log(getUserStatus.data.success)
    // }
    
        // let locale: any = localStorage.getItem('user')
        // let store = JSON.parse(locale)
        // console.log(store._id)
        // let id = store._id
        // const getUserStatus = await axios.post('/api/users/bio/' + id, data, {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         'Content-Type': 'application/json',
        //     }
        // }).then(response => response.data)
        // console.log(getUserStatus.data.success)
    

    return (
        <div>
            <Navbar/>
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
                            placeholder="Your name"
                            onBlur={userBio}
                         />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                               maxLength={10}
                               type="tel"
                               name="number"
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