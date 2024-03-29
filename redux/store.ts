import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from '@/redux/checkoutSlice'

const store = configureStore({
    reducer: {
        checkout: checkoutReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
