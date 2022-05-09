import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import UserService from '../services/user.service'

const Home: NextPage = () => {
	const us = new UserService();
	const us1 = new UserService();
	console.log(us.rand, us1.rand);
	return (
		<h1>Hello World</h1>
	)
}

export default Home
