import React from 'react'
import Profile from "@Components/screens/Profile";
import {NextPageAuth} from "@Interfaces/app/NextPageWithProps";

const ProfilePage: NextPageAuth = (props) => {
    return (
        <Profile/>
    );
}

ProfilePage.withAuth = true;

export default ProfilePage;