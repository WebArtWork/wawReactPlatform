import {AppDispatch} from "@Redux/store";
import {useDispatch} from "react-redux";

// export const useAppDispatch: () => useDispatch<AppDispatch>();
export const useAppDispatch = () => useDispatch<AppDispatch>();