import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    user: userReducer,
});



export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

// export  type RootStore = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
