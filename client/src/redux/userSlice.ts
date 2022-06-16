import {IUser} from "Types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    user: {
        _id: '',
        email: '',
        thumb: '',
        is: {
            admin: false
        },
        token: '',
        data: {
            name: '',
            phone: '',
            bio: ''
        }
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state , action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setUserData: (state, action) => {
            state.user.data = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.user = action.payload.user.user
        }
    }
})

export const {setUser, setUserData} = userSlice.actions;
export default userSlice.reducer;