import type {GetServerSideProps, NextPage} from 'next'
import React, {useState} from 'react'
import {useRouter} from "next/router";

import {IUser} from "Types/IUser";
import {Modal} from "Components/Modal/Modal";
import {useAppDispatch} from "Hooks/useRedux";
import {setUser} from "Redux/userSlice";
import {authLogin, authSign, authStatus, getMe} from '@Api/auth';
import {wrapper} from "Redux/store";
import {parseCookies, setCookie} from "nookies";

const Login: NextPage = () => {
    const [email, setEmail] = useState('ceo@webart.work');
    const [password, setPassword] = useState('asdasdasdasd');
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter()

    const login = async () => {
        const user: IUser = await authLogin(email, password)
        dispatch(setUser(user));
        setCookie(null, 'authToken', user.token,{
            maxAge: 30*24*60*60,
            path: '/'
        })
        router.push({pathname: '/profile'}, undefined, {shallow: true})
    }

    const sign = async () => {
        const user: IUser = await authSign(email, password)
        dispatch(setUser(user));
        setCookie(null, 'authToken', user.token,{
            maxAge: 30*24*60*60,
            path: '/'
        })
        router.push({pathname: '/profile'}, undefined, {shallow: true})
    }

    const submit = async (e: any) => {
        e.preventDefault()
        const userStatus : IUser = await authStatus(email);
        userStatus.email ? login() : sign()
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title user_password">Password:</span>
                        <input
                            type={
                                passwordToggle ?
                                    "text" :
                                    "password"}
                            className="w-forms__input"
                            id="password"
                            value={password}
                            // onFocus={handleOnFocus}
                            // onBlur={handleOnBlur}
                            // onKeyUp={handleOnKeyUp}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password" name="password"
                        />


                        <span onClick={() => {
                            setPasswordToggle(!passwordToggle)
                        }}>
							{
                                passwordToggle ?
                                    <span className="material-symbols-outlined">visibility_off</span> :
                                    <span className="material-symbols-outlined">visibility</span>
                            }
						</span>
                        <a className="forgot-password"
                           onClick={() => setModalToggle(!modalToggle)}>
                            Forgot password
                        </a>
                    </div>
                    <div className="auth__btn">
                        <button className="w-btn _primary"
                                onClick={submit}>
                            Lets go
                        </button>

                        <Modal onClose={() => setModalToggle(!modalToggle)} show={modalToggle}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store =>  async (ctx) => {
    const {authToken} = parseCookies(ctx);
    if(authToken) {
        const user = await getMe(authToken);
        await store.dispatch(setUser(user));
        return {
            redirect: {
                permanent: false,
                destination: `/profile`
            }
        }
    }

    return {
        props: {}
    }
})

export default Login;
