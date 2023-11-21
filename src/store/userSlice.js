import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/api/axiosClient";
import axiosTokenClient from "../utils/api/axiosTokenClient";

const initialState = {
    loading:false,
    error:null,
    isAuth: false,
    success: false,
    userData: null,
}
export const checkTokenValidity = async (token) => {
    try {
        const request = await axiosClient.post(`Account/CheckTokenValidity?token=${token}`);
        return request.data === 'Valid';
    } catch (error) {
      console.error('Błąd przy uwierzytelnianiu użytkownika - token jest przeterminowany!');
      return false;
    }
  };
export const checkUserLogin = createAsyncThunk(
    'user/auth',
    async () => {
      const rawToken = localStorage.getItem('token');
      if (rawToken) {
        const token = rawToken.replace(/^"|"$/g, '');
        const isLogged = await checkTokenValidity(token);
        return isLogged;
      } else {
        return false;
      }
    }
  );
export const loginUser = createAsyncThunk(
    'user/login',
    async(userCredentials) => {
        const response = await axiosClient.post('/Account/login', userCredentials)
        return response.data
    }
)
export const registerUser = createAsyncThunk(
    'user/register',
    async(userCredentials) => {
        const request = await axiosClient.post('Account/registration',userCredentials)
        return request.data
    }
)
export const fetchUserData = createAsyncThunk(
    'user/data',
    async() => {
        const response = await axiosTokenClient.get('User/Data')
        return response.data
    }
)
export const resetPasswordEmail = createAsyncThunk(
    'user/resetPasswordEmail',
    async(data) => {
        const response = await axiosClient.post('/Account/ForgotPassword', data)
        return response.data
    }
)
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async(data) => {
        const request = await axiosClient.post('/Account/ResetPassword', data)
        return request.data
    }
)
export const createCustomer = createAsyncThunk(
    'user/createCustomer',
    async({data,id}) => {
        const request = await axiosClient.post(`/Account/CreateCustomerData?userId=${id}`, data)
        return request.data
    }
)
export const editUserData = createAsyncThunk(
    'user/editData',
    async(data) => {
        const request = await axiosTokenClient.put('/User/Edit-Data', data)
        return request.data
    }
)
export const deleteAccount = createAsyncThunk(
    'user/delete',
    async() => {
        const request = await axiosTokenClient.delete('/User/Deactivate')
        return request.data
    }
)
export const authMiddleware = (store) => (next) => (action) => {
    if (action.type === 'user/logout') {
      localStorage.removeItem('token')
    } else if (loginUser.fulfilled.match(action)) {
      const token = action.payload;
      localStorage.setItem('token', JSON.stringify(token));
    }else if (deleteAccount.fulfilled.match(action)) {
        localStorage.removeItem('token')
    }
    return next(action);
  }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state,action) => {
            state.isAuth = false
            state.success = false
            state.userData = null
            state.error = null
        },
        resetState: (state,action) => {
            state.success = false
            state.error = null
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isAuth = true
            state.loading = false
        }).addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nieudane logowanie!' 
        }).addCase(registerUser.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Podane dane już istnieją w naszej bazie!' 
        }).addCase(fetchUserData.pending,(state)=>{
            state.loading = true
        }).addCase(fetchUserData.fulfilled,(state,action)=>{
            state.loading = false
            state.userData = action.payload
        }).addCase(fetchUserData.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie można pobrać danych użytkownika!' 
        }).addCase(resetPasswordEmail.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(resetPasswordEmail.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(resetPasswordEmail.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie znaleziono podanego adresu email!' 
        }).addCase(resetPassword.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(resetPassword.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się odzyskać hasła!' 
        }).addCase(checkUserLogin.fulfilled, (state, action) => {
            state.isAuth = action.payload;
        }).addCase(createCustomer.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(createCustomer.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(createCustomer.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się zapisać danych!' 
        }).addCase(deleteAccount.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(deleteAccount.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.isAuth = false
            state.userData = null
            state.error = null
        }).addCase(deleteAccount.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się usunąć konta!' 
        }).addCase(editUserData.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(editUserData.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(editUserData.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się zmienić danych!' 
        })
    }
})
export const { logout, resetState } = userSlice.actions
export default userSlice.reducer
