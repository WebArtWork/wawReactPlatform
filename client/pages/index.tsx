import type {NextPage} from 'next'
import Link from 'next/link'
import React, {Component, useState} from 'react'
import UserService from "../services/user.service";
import axios from "axios";


const Login: NextPage = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const submit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/api/user/status', {
            email: 'qwe',
            pass: 'qwe'
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(resp => {
            console.log(resp);
        })
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
                            name="email"/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Password:</span>
                        <input type={
                            passwordShown ?
                                "text" :
                                "password"}
                               className="w-forms__input"
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