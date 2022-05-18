import type { NextPage } from 'next'
import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Logout } from '@mui/icons-material'
import { Edit } from '@mui/icons-material'


const Profile = () => {
  return (
    <div className="profile container w-card _pd">
      <Navbar />
      <div className="profile__header w-card__header">
        <div>Profile Settings</div>
        <div>
          <div className="avatar _profile">
            <img className="avatar__upload" src="" width={50} height={50} />
            <label className="avatar__upload"><Edit className='avatar__icon' /></label>
          </div>
        </div>
      </div>
      <div className="profile__body">
        <div className="w-forms">
          <span className="w-forms__title">Name</span>
          <input className="w-forms__input" type="text" name="name" placeholder="Your name" />
        </div>
        <div className="w-forms">
          <span className="w-forms__title">Phone number</span>
          <input className="w-forms__input" maxLength={10} type="tel" name="number" placeholder="Phone number" />
        </div>
        <div className="w-forms">
          <span className="w-forms__title">Bio</span>
          <textarea className="w-forms__textarea" placeholder="Bio"></textarea>
        </div>
        <div className=">profile__logout">
          <button className="logout-button _danger"><Logout />Logout</button>
        </div>
      </div>
    </div >
  )
}

export default Profile;