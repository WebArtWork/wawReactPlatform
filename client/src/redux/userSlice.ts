import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserDataInterface, UserInterface} from "@Interfaces/User.interface";
import UserService from "@Services/UserService";


const initialState: UserInterface = {
    _id: '',
    email: '',
    reg_email: '',
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

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    return await UserService.fetchMe();
});

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (store, action: PayloadAction<UserInterface>) => {
            store = action.payload
        },
        setUserData: (store, action: PayloadAction<UserDataInterface>) => {
            store.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (store, action: PayloadAction<UserInterface>) => {
                store = action.payload
            })
    }
})

export const {setUser, setUserData} = userSlice.actions;
export const selectUser = (state: any) => state.userClient;
export default userSlice.reducer;