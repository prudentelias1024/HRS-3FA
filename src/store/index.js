import {createSlice,configureStore} from '@reduxjs/toolkit'


const appSlice = createSlice({
    name: 'store',
    initialState: {currentUser: null, medical_info: null},
    reducers: {
        updateUser(state,action){
             state.currentUser = action.payload
        },
        updateMedicalInfo(state,action){
             state.medical_info = action.payload
        }
    }
})

const store = configureStore({
    reducer: appSlice.reducer
})


export const actions = appSlice.actions
export default store