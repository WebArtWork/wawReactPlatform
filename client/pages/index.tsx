import type {NextPage} from 'next'
import React, {useState} from 'react'
import axios from "axios";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {userGuard} from "../hooks/userGuard";

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
    const router = useRouter()
    // const [ user, setUser ] = userStorage('user')
    const [session, setSession] = userGuard('session')
    const [cookie, setCookie] = useCookies(['userToken'])
    const [emailInput, setEmailInput] = useState('ceo@webart.work');
    const [passInput, setPassInput] = useState('asdasdasdasd');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }
    if (cookie.userToken)
        router.push('/profile')

    const login = async () => {
        const user: Promise<User> = await axios.post('/api/user/login', {
            email: emailInput,
            password: passInput
        }).then(response => response.data)
        setSession(user)
        setCookie('userToken', user.token, {path: '/'})
        router.push('/profile')
    }

    const sign = async () => {
        const user = await axios.post('/api/user/sign', {
            email: emailInput,
            password: passInput
        }).then(response => response.data)
        setSession(user)
        setCookie('userToken', user.token, {path: '/'})
        router.push('/profile')
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
                            Lets go
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;