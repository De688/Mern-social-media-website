import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authservices'


// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    isLogin:false,
    message:''
}

//register user
export const register = createAsyncThunk('auth/register', async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
// login user
export const userlogin = createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//log out function 
export const userlogout = createAsyncThunk('auth/logout',async(_,thunkAPI)=>{
    try {
        return await authService.logout()
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})

const useSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
    },    
        extraReducers:(builder)=>{
                builder
                    .addCase(register.pending, (state)=>{
                        state.isLoading = true;
                    })
                    .addCase(register.fulfilled, (state,action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        state.isLogin = true
                        state.user = action.payload
                    })
                    .addCase(register.rejected, (state,action)=>{
                        state.isLoading = false
                        state.isError = true
                        state.isLogin = false
                        state.message = action.payload
                        state.user = null
                    }) 
                    //cases for login
                    .addCase(userlogin.pending, (state)=>{
                        state.isLoading = true;
                    })
                    .addCase(userlogin.fulfilled, (state,action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        state.isLogin = true
                        state.user = action.payload
                    })
                    .addCase(userlogin.rejected, (state,action)=>{
                        state.isLoading = false
                        state.isError = true
                        state.isLogin = false
                        state.message = action.payload
                        state.user = null
                    })
                    .addCase(userlogout.fulfilled, (state)=>{
                        state.user = null
                    })
                        
    }
         
})

export const {reset} = useSlice.actions;
export default useSlice.reducer;