import type { NextPage } from 'next'
import React, { Component } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'




export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			showPassword: false,
		}
	}
	render() {
		return (
			<div className="auth-wrapper">
				<div className="auth">
					<div className="auth__title">Sign In / Sign Up</div>
					<form className="auth__forms">
						<div className="w-forms">
							<span className="w-forms__title">Email:</span>
							<input className="w-forms__input" type="text" placeholder="Email" name="email" />

						</div>
						<div className="w-forms">
							<span className="w-forms__title">Password:</span>
							<input type={this.state.showPassword ? 'text' : 'password'} className="w-forms__input" placeholder="Password" name="password" />
							<span onClick={() => this.setState({ showPassword: !this.state.showPassword })}>
								{this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</span>
						</div>
						<div className="auth__btn">
							<span className="w-btn _primary" type="submit" onClick={event => window.location.href="/profile"}>Let's go</span>
						</div>
					</form>
				</div>
			</div >
		)
	}
}

