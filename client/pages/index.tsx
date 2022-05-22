import type {NextPage} from 'next'
import Link from 'next/link'
import React, {Component, useState} from 'react'


const Login: NextPage = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

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
                        <Link href="/profile">
                            <button className="w-btn _primary"
                                    type="submit">
                                Let's go
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;