import type {NextPage} from 'next'
import React, {Component, useState} from 'react'
import axios from "axios";
import {useStorage} from "../hooks/useStorage";

const Login: NextPage = () => {
    const [ user, setUser ] = useStorage('user')
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const login = async () => {
        const user = await axios.post('/api/user/login', {
            email: emailInput,
            pass: passInput
        }).then(response => response.data)
        setUser(user)
    }

    const sign = async () => {
        const user = await axios.post('/api/user/sign', {
            email: emailInput,
            pass: passInput
        }).then(response => response.data)
        setUser(user)
    }

    const submit = async (e) => {
        e.preventDefault()
        const getUserStatus = await axios.post('/api/user/status', {
            email: emailInput,
            pass: passInput
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
        if (getUserStatus.email) {
            login()
        } else {
            sign()
        }
        console.log(getUserStatus)
    }

    return (
        <div className="auth-wrapper">
            <div className="auth">
                <div className="auth__title">Sign In / Sign Up</div>
                <form className="auth__forms">
                    <div className="w-forms">
                        <span className="w-forms__title">Email:</span>
                        <input
                            className="w-forms__input"
                            type="text" placeholder="Email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            name="email"/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Password:</span>
                        <input type={
                            passwordShown ?
                                "text" :
                                "password"}
                               className="w-forms__input"
                               value={passInput}
                               onChange={(e) => setPassInput(e.target.value)}
                               placeholder="Password" name="password"/>

                        <span onClick={togglePasswordVisiblity}>
							{
                                passwordShown ?
                                    <span className="material-symbols-outlined">visibility_off</span> :
                                    <span className="material-symbols-outlined">visibility</span>
                            }
						</span>
                    </div>
                    <div className="auth__btn">
                        <button className="w-btn _primary"
                                onClick={submit}>
                            Let's go
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;