import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SolanaMirror, { ParsedAta } from 'solana-mirror'
import { fetchAtas } from './thunk'

type UserState = {
    client: SolanaMirror | null
    atas: ParsedAta[]
}

const initialState: UserState = {
    client: null,
    atas: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setClient: (state, action: PayloadAction<SolanaMirror>) => {
            state.client = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAtas.fulfilled, (state, action) => {
            state.atas = action.payload.atas
        })
    },
})

export const { setClient } = userSlice.actions

export const selectAtas = (state: { user: UserState }) => state.user.atas
export const selectClient = (state: { user: UserState }) => state.user.client

export default userSlice.reducer
