import { createAsyncThunk } from '@reduxjs/toolkit'
import { ParsedAta } from 'solana-mirror'
import { ThunkConfig } from '../types'
import BN from 'bn.js'
import { fetchImages } from '@/services/fetchImage'

export const fetchAtas = createAsyncThunk<
    { atas: ParsedAta[] },
    {},
    ThunkConfig
>('user/fetchAtas', async (_, { getState }) => {
    const client = getState().user.client

    if (!client) {
        return { atas: [] }
    }

    try {
        const atas = await client.getTokenAccounts()
        const _atasWithImages = await fetchImages(atas)

        return { atas: _atasWithImages }
    } catch (e) {
        console.log('Error fetching atas: ', e)
        return { atas: [] }
    }
})
