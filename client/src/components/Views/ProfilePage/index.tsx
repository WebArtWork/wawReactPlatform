import React, {useEffect, useState} from 'react';
import {IUser} from "Types/IUser";
import {useRouter} from "next/router";
import {Modal} from "Components/Modal/Modal";
import {useAppDispatch, useAppSelector} from "Hooks/useRedux";
import {destroyCookie, parseCookies} from "nookies";
import useDebounce from "Hooks/useDebounce";
import {update} from "@Api/user";
import {setUser, setUserData} from "Redux/userSlice";

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
        <div>
            <div className="profile container w-card _pd">
                <div className="profile__header w-card__header">
                    <div>Profile Settings</div>
                    <div>
                        <form className="avatar _profile">
                            <img alt="profileImage" className="avatar__upload" id="blah" src={user.thumb}
                                 style={{width: '58px', height: '58px'}}/>
                            {/*<input type="file" accept="png" id="image" className="avatar__upload"*/}
                            {/*    //  onChange={uploadFile}*/}
                            {/*       name="img"/>*/}
                            <span className="material-symbols-outlined">edit</span>
                        </form>
                    </div>
                </div>
                <div className="profile__body">
                    <div className="w-forms">
                        <span className="w-forms__title">Name</span>
                        <input
                            className="w-forms__input"
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Your name"
                            onChange={handleChange}
                        />

                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Phone number</span>
                        <input
                            id="phone"
                            className="w-forms__input"
                            maxLength={10}
                            type="tel"
                            name="phone"
                            value={data.phone}
                            placeholder="Phone number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-forms">
                        <span className="w-forms__title">Bio</span>
                        <textarea
                            id="bio"
                            className="w-forms__textarea"
                            placeholder="Bio"
                            name="bio"
                            maxLength={100}
                            value={data.bio}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className=">profile__logout">
                        <button type="button" className="w-btn _primary"
                                onClick={() => setModalToggle(!modalToggle)}>Change password
                        </button>
                        <Modal onClose={() => setModalToggle(!modalToggle)} show={modalToggle}/>
                        <button className="logout-button _danger" onClick={logout}>
                            <span className="material-symbols-outlined">logout</span>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;
