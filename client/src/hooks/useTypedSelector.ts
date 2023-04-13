import {
    useSelector ,
    TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '@Redux/store'

// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;