import { AppDispatch, RootState } from './store'

export type ThunkConfig = {
    dispatch: AppDispatch
    state: RootState
}
