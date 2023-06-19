import {createSlice} from '@reduxjs/toolkit'

const initialState={
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    
}

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
            //abhi ke ye additonal hai 
            state.userInfo=action.payload;
            //yaha tak aur ye bug fix ker dia vo name wala 
            localStorage.setItem('userInfo', JSON.stringify(action.payload) );
        },
        logout: (state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setCredentials,logout} = authSlice.actions;

export default authSlice.reducer;