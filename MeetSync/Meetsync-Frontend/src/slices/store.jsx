import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import appointmentReducer from "./appointmentSlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        appointments: appointmentReducer
    }
})

export default store