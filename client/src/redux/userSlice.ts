import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {UserInterface} from "@Interfaces/User.interface";

const initialState: UserInterface = {
    _id: '',
    email: '',
    reg_email:'',
    thumb: '',
    is: {
        admin: false
    },
    data: {
        name: '',
        phone: '',
        bio: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (user, action: PayloadAction<UserInterface>) => {
            user = action.payload
        },
        setUserData: (user, action) => {
            user.data = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (user, action) => {
            user = action.payload.user.user
        }
    }
})

export const {setUser, setUserData} = userSlice.actions;
export default userSlice.reducer;