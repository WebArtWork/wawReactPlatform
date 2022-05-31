import React, {useEffect, useState} from "react";
import {userGuard} from "../hooks/userGuard";
import axios from "axios";
export const Modal = (props: any) => {
    const [passInput, setPassInput] = useState('')
    const [session, setSession] = userGuard('session')
    if (!props.show) {
        return null
    }

    const changePassword = async () => {
        let locale = localStorage.getItem('session')
        let store = JSON.parse(locale)
       const user = await axios.post('/api/user/changePassword/' + store._id, {
            oldPass: 'asdasdasdasd',
            newPass: passInput
        }).then((response) => { console.log(response)})
        console.log(user)
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <header className="modal__header">
                    <h1 className="modal__title">Change password</h1>
                </header>
                <main className="modal__content">
                    <input className="w-forms__input input"
                           type="password"
                           placeholder="Password"
                           name="password"
                           value={passInput}
                           onChange={(e) => setPassInput(e.currentTarget.value)}
                    />
                </main>
                <footer className="modal__footer">
                    <button className="w-btn _second" type="button" onClick={props.onClose}>Close</button>
                    <button className="w-btn _primary" onClick={changePassword}>Save changes</button>
                </footer>
            </div>
        </div>
    )
}