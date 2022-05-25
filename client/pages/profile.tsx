import axios from 'axios'
import type {NextPage} from 'next'
import React, {Component, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'


const Profile: NextPage = () => {
    const [formValue, setValue] = useState({
        nameInput: '',
        bioInput: '',
        numberInput: ''
        
    })

    const userBio = async (e: any) => {
        e.preventDefault()
        const getUserStatus = await axios.post('/api/user/profile', {
            name: formValue.nameInput,
            bio: formValue.bioInput,
            number: formValue.numberInput
        }, {
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
                            value={formValue.nameInput}
                         />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input className="w-forms__input"
                                maxLength={10} 
                                type="tel" name="number"
                               placeholder="Phone number"
                               value={formValue.numberInput}/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea 
                            className="w-forms__textarea"
                            placeholder="Bio"
                            value={formValue.bioInput}>
                        </textarea>
                    </div>
                    <div className=">profile__logout">
                        <button className="logout-button _danger">
                            <span className="material-symbols-outlined">logout</span>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;