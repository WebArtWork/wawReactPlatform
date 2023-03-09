import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '@Redux/store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useReduxSelector