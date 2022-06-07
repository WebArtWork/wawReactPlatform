import Head from "next/head"
import type {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {useStorage} from "../hooks/useStorage";
import {useGuard} from "../hooks/useGuard";
import {Modal} from "../modal/Modal";
import PWDRequire from "../components/PWDRequire/PWDRequire"
import UserService from "../services/user.service";

interface User {
    _id: string;
    email: string;
    thumb: string;
    is: {
        admin: boolean;
    };
    token: string;
}

const Login: NextPage = () => {
    const us = new UserService()
    const router = useRouter()
    const [user, setUser] = useStorage<User>('user', null)
    const [show, setShow] = useState(false)
    // const [session, setSession] = useGuard('session')
    const [cookie, setCookie] = useCookies(['userToken'])
    const [emailInput, setEmailInput] = useState('ceo@webart.work');
    const [passInput, setPassInput] = useState('asdasdasdasd');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }

    const [pwdRequire, setPwdRequire] = useState(false)
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharCheck: false,
    })

    const handleOnFocus = () => {
        setPwdRequire(true)
    }

    const handleOnBlur = () => {
        setPwdRequire(false)
    }

    const handleChange = (e: any) => {
        setPassInput(e.target.value)
    }

    const handleOnKeyUp = (e: any) => {
        const {value} = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length >= 8;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        
        setChecks({
            capsLetterCheck,
            numberCheck,
            pwdLengthCheck,
            specialCharCheck,
        });
    }

    // if (cookie.userToken)
    //     router.push({pathname: '/profile'}, undefined, {shallow: true})

    const login = async () => {
        const user: User = await axios.post('/api/user/login', {
            email: emailInput,
            password: passInput
        }).then(response => response.data)
        setUser(user)

        setCookie('userToken', user.token, {path: '/'})
        router.push({pathname: '/profile'}, undefined, {shallow: true})
    }

    const sign = async () => {
        const user = await axios.post('/api/user/sign', {
            email: emailInput,
            password: passInput
        }).then(response => response.data)
        setUser(user)
        setCookie('userToken', user.token, {path: '/'})
        router.push({pathname: '/profile'}, undefined, {shallow: true})
    }

    const submit = async (e:any) => {
        e.preventDefault()
        const getUserStatus = await axios.post('/api/user/status', {
            email: emailInput,
            password: passInput
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
                    <span className="w-forms__title user_password">Password:</span>
                    <input type={
                        passwordShown ?
                            "text" :
                            "password"}
                           className="w-forms__input"
                           id="password"
                           value={passInput}
                           onFocus={handleOnFocus}
                           onBlur={handleOnBlur}
                           onKeyUp={handleOnKeyUp}
                           onChange={handleChange}
                           placeholder="Password" name="password"/>

                    {pwdRequire ? (
                        <PWDRequire
                            capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                            numberFlag={checks.numberCheck ? "valid" : "invalid"}
                            pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                            specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
                        />
                    ) : null}

                    <span onClick={togglePasswordVisiblity}>
							{
                                passwordShown ?
                                    <span className="material-symbols-outlined">visibility_off</span> :
                                    <span className="material-symbols-outlined">visibility</span>
                            }
						</span>
                    <a className="forgot-password"
                       onClick={() => setShow(true)}>
                        Forgot password
                    </a>
                </div>
                <div className="auth__btn">
                    <button className="w-btn _primary"
                            onClick={submit}>
                        Lets go
                    </button>
                    <Modal onClose={() => setShow(false)} show={show}/>
                </div>
            </form>
        </div>
    </div>
)
}

export default Login;
