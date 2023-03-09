import React, {FC} from 'react';
import styles from './style.module.scss';
import Image from "next/image";
import Icon from "@Components/UI/Icon";
import Input from "@Components/UI/Input";
import Form from "@Components/UI/Form";
import {useTheme} from "@Hooks/useTheme";
import Button from "@Components/UI/Button";
import AuthService from "../../../services/AuthService";
import {useAppDispatch} from "@Hooks/useAppDispatch";
import {setUser} from "@Redux/userSlice";
import {useRouter} from "next/router";
import {setCookie} from "nookies";

const Index: FC = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const {theme, toggleTheme} = useTheme();

    const [email, setEmail] = React.useState('ceo@webart.work');
    const [password, setPassword] = React.useState('asdasdasdasd');

    const authHandler =  async () => {
        const status = await AuthService.status(email, password)
        let user = null;
        if (status.email && status.pass) {
            user = await AuthService.login(email, password);
        } else {
            user = await AuthService.register(email, password);
        }

        const token = user.token;
        setCookie(null, 'token', token,
            { path: '/', secure: true}
        );

        dispatch(setUser(user))

        await router.replace('/profile');
    }

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authWrap}>
                <div className={styles.authImage}>
                    <Image src={'/images/spider.svg'} alt="spider" layout={"fill"} objectFit={"contain"}
                           onClick={toggleTheme}/>
                </div>
                <div className={styles.authForm}>
                    <div className={styles.auth}>
                        <Icon className={styles.changeThemeButton} name={`${theme}_mode`}
                              onClick={toggleTheme}/>
                        <Form className={styles.form} title="Sign In / Sign Up">
                            <Input value={email}
                                   onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                   type="email" label="E-mail"
                                   placeholder="fill your email"
                            />
                            <Input value={password}
                                   onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                   type="password" label="Password"
                                   placeholder="fill your password"
                            />
                            <Button onClick={authHandler} variant={"primary"} className={styles.formButton}>Let's go</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;