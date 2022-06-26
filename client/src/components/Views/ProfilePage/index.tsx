import React, {useEffect, useState} from 'react';
import {IUser} from "Types/IUser";
import {useRouter} from "next/router";
import {Modal} from "Components/Modal/Modal";
import {useAppDispatch, useAppSelector} from "Hooks/useRedux";
import {destroyCookie, parseCookies} from "nookies";
import useDebounce from "Hooks/useDebounce";
import {update} from "@Api/user";
import {setUser} from "Redux/userSlice";
import s from './Profile.module.css'

function Index(props: any) {
    const user = useAppSelector<IUser>((state) => state.user.user);

    const [data, setData] = useState({
        name: user.data.name ?? '',
        phone: user.data.phone ?? '',
        bio: user.data.bio ?? ''
    })

    const [modalToggle, setModalToggle] = useState(false)
    const debouncedUpdate = useDebounce(data, 300)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const {authToken} = parseCookies(null);

    useEffect(() => {
        if (debouncedUpdate) {
            updateUser();
        }
    }, [debouncedUpdate]);

    const updateUser = async () => {
        const updatedUser: IUser = await update(user, data, authToken);
        dispatch(setUser(updatedUser))

    }
    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const logout = () => {
        destroyCookie(null, 'authToken');
        router.push('/');
    }

    return (
        <div className={s.container}>
            <div className={s.card}>
                <div className={s.cardHeader}>
                    <p className={s.title}>Profile Settings</p>
                    <div>
                        <form className={s.avatar}>
                            <img alt="profileImage"id="blah" src={user.thumb}
                                    style={{width: '58px', height: '58px'}}/>
                            <span className={`material-symbols-outlined ${s.avatarUpload}` }>edit</span>
                        </form>
                    </div>
                </div>
                <div className={s.profileBody}>
                    <div className={s.form}>
                        <span className={s.formTitle}>Name</span>
                        <input
                            className={s.input}
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Your name"
                            onChange={handleChange}
                        />

                    </div>
                    <div className={s.form}>
                        <span className={s.formTitle}>Phone number</span>
                        <input
                            id="phone"
                            className={s.input}
                            maxLength={10}
                            type="tel"
                            name="phone"
                            value={data.phone}
                            placeholder="Phone number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={s.form}>
                        <span className={s.formTitle}>Bio</span>
                        <textarea
                            id="bio"
                            className={s.textarea}
                            placeholder="Bio"
                            name="bio"
                            maxLength={100}
                            value={data.bio}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className={s.profileLogout}>
                        <button type="button" className={`${s.button} ${s.primary}`}
                                onClick={() => setModalToggle(!modalToggle)}>Change password
                        </button>
                        <Modal onClose={() => setModalToggle(!modalToggle)} show={modalToggle}/>
                        <button className={`${s.button} ${s.error}`} onClick={logout}>
                            <span className={`material-symbols-outlined`}>logout</span>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;
