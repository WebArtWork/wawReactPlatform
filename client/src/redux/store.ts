import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import userReducer from "./userSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer
        },
        devTools: process.env.NODE_ENV !== 'production'
    })
}
export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<RootStore>(makeStore);
