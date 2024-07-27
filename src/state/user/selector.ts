import { RootState } from '../store'

export const selectClient = (state: RootState) => state.user.client
export const selectAtas = (state: RootState) => state.user.atas
