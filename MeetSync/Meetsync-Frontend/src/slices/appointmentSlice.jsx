import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    appointments: []
}

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointments: (state, action) => {
            state.appointments = action.payload
        }
    }
})

export const {setAppointments} = appointmentsSlice.actions
export const selectAppointments = (state) => state.appointments.appointments
export default appointmentsSlice.reducer