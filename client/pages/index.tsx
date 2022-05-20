import type {NextPage} from 'next'
import React, {Component, useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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
                        <input className="w-forms__input"
                               type="text" placeholder="Email"
                               name="email"/>
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Password:</span>
                        <input type={passwordShown ? "text" : "password"} className="w-forms__input"
                               placeholder="Password" name="password"/>
                        <span onClick={togglePasswordVisiblity}>
							{passwordShown ? <VisibilityOffIcon/> : <VisibilityIcon/>}
						</span>
                    </div>
                    <div className="auth__btn">
                        <button className="w-btn _primary"
                                type="submit">
                            Let's go
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;