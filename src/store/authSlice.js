//store for tracking authentication(user logged in or not)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //login state
        //action gives payload, state mai jo bhi value update krni hai wo initial state ke baad track mai update ho jati hai
        login: (state, action) => {
            //when login method dispatch, then make status true
            state.status = true
            state.userData = action.payload.userData
        },
        //don't need action payload
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})
//reducers individual function, they also exported
//authSlice ke andar reducers ke andar jo hai use actions bolte hai
export const { login, logout } = authSlice.actions

//exporting reducers
export default authSlice.reducer

//post bhi state mai hi jaane chaiye