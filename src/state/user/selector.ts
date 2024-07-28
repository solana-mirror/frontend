import { RootState } from '../store'

export const selectClientValue = (state: RootState) => state.user.client
export const selectAtasValue = (state: RootState) => state.user.atas
