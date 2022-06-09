import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import articleServices from './articleService';

const initialState = {
    Articles:[],
    Article:{},
    ArticleId:'',
    isLoading:false,
    isSuccess:false,
    isError:false,
    isLogin:false,
    message:''
}
//this article takes the id from home component for update post
export const addarticleid = createAsyncThunk('article/addArticleid',(id,thunkAPI)=>{
    try {
        return articleServices.addArticleid(id)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//this is the function for posting articles

export const createarticle = createAsyncThunk('article/createArticle',async(Article,thunkAPI)=>{
    try {
        return await articleServices.createArticle(Article)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//this is the function for fetching articles
//notes we are passing the dash bcause we dont have to pass any data 

export const Getarticles = createAsyncThunk('/getarticles',async(_,thunkAPI)=>{
    try {
        return await articleServices.getposts()
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//this is the function for updating articles

export const updatearticle = createAsyncThunk('article/updatearticle',async(userData,ArticleId,thunkAPI)=>{
 
    try {
        return await articleServices.updateArticle(userData,ArticleId)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//this is the function for deleting articles

export const deletearticle = createAsyncThunk('article/delete',async(id,thunkAPI)=>{
    try {
        return await articleServices.deleteArticle(id)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})
//fuction for like functionality
export const likearticle = createAsyncThunk('article/like',async(id,thunkAPI)=>{
    try {
        return await articleServices.likeArticle(id)
    } catch (error) {
        const message = (error.response && error.response && error.response.data && error.response.data.message) || error.message||error.toString()
        return thunkAPI.fulfillWithValue(message)
    }
})

const articleSlice = createSlice({
    name:'article',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createarticle.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createarticle.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.Articles = action.payload
        })
        .addCase(createarticle.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.Articles = null
        })
        .addCase(Getarticles.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(Getarticles.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.Articles = action.payload
        })
        .addCase(Getarticles.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) 
        .addCase(addarticleid.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addarticleid.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.ArticleId = action.payload
        })
        .addCase(addarticleid.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) 
        .addCase(updatearticle.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updatearticle.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.Articles = state.Articles.map((item)=>item._id === state.ArticleId? action.payload : '')
        })
        .addCase(updatearticle.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) 
        .addCase(likearticle.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.Articles = state.Articles.map((item)=>item._id === action.payload._id ? action.payload : null)
        })
        .addCase(likearticle.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) 
        .addCase(deletearticle.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.Articles = state.Articles.filter((item)=>item._id !== action.payload.id)
        })
        .addCase(deletearticle.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) 
    }
})

export const {reset}  = articleSlice.actions
export default articleSlice.reducer