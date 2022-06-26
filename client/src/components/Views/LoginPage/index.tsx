import type { NextPage } from 'next'
import React, { useState } from 'react'
import { useRouter } from "next/router";

import { IUser } from "Types/IUser";
import { Modal } from "Components/Modal/Modal";
import { useAppDispatch } from "Hooks/useRedux";
import { setUser } from "Redux/userSlice";
import { authLogin, authSign, authStatus, getMe } from '@Api/auth';
import { setCookie } from "nookies";

import s from './Login.module.css'

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('ceo@webart.work');
    const [password, setPassword] = useState('asdasdasdasd');
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter()

    const login = async () => {
        const user: IUser = await authLogin(email, password)
        dispatch(setUser(user));
        setCookie(null, 'authToken', user.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        })
        router.push({ pathname: '/profile' }, undefined, { shallow: true })
    }

    const sign = async () => {
        const user: IUser = await authSign(email, password)
        dispatch(setUser(user));
        setCookie(null, 'authToken', user.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        })
        router.push({ pathname: '/profile' }, undefined, { shallow: true })
    }

    const submit = async (e: any) => {
        e.preventDefault()
        const userStatus: IUser = await authStatus(email, password);
        userStatus.email && userStatus.pass ? login() : sign()
    }

    return (
        <div className={s.container}>
            <div className={s.auth}>
                <p className={s.title}>Sign In / Sign Up</p>
                <form className="auth__forms">
                    <div className={s.form}>
                        <span className={s.formTitle}>Email:</span>
                        <input
                            className={s.input}
                            type="text" placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={s.form}>
                        <span className={s.formTitle}>Password:</span>
                        <input
                            type={
                                passwordToggle ?
                                    "text" :
                                    "password"}
                            className={s.input}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password" name="password"
                        />


                        <span className={s.forgotPassword}
                            onClick={() => {
                            setPasswordToggle(!passwordToggle)
                        }}>
                            {
                                passwordToggle ?
                                    <span className={'material-symbols-outlined'}>visibility_off</span> :
                                    <span className={'material-symbols-outlined'}>visibility</span>
                            }
                        </span>
                    </div>
                    <div className={s.buttonContainer}>
                        <button className={s.button}
                            onClick={submit}>
                            Lets go
                        </button>

                        <Modal onClose={() => setModalToggle(!modalToggle)} show={modalToggle} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;