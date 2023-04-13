import React, {FC} from 'react';
import Layout from "@Components/containers/Layout";
import {useAppSelector} from "@Hooks/useTypedSelector";
import {UserInterface} from "@Interfaces/User.interface";
import {useAppDispatch} from "@Hooks/useAppDispatch";

const Profile: FC = () => {
    const {data: user, loading} = useAppSelector( state => state.user);
    const dispatch = useAppDispatch();
    // console.log('profile page',user)
    if(loading) return <div>Loading...</div>


    return (
        <Layout title="My Profile">
            <p>Profile</p>

            <p> email: {JSON.stringify(user)}</p>
        </Layout>
    );
};

export default Profile;