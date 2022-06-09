import axios from "axios";

const createArticle = async(userData)=>{
    const response = await axios.post('http://localhost:5000/api/articles/sendarticle', userData);
    return response.data
    
}
const addArticleid = (id)=>{
    return id
}
const updateArticle = async(userData,id) =>{
    
      const response = await axios.put(`http://localhost:5000/api/articles/updatearticle/${id}`, userData)
   
      return response.data
}
const likeArticle = async(id) =>{
    const response = await axios.put(`http://localhost:5000/api/articles/like/${id}`)
    return response.data
}
const deleteArticle = async(id) =>{
     const response = await axios.delete(`http://localhost:5000/api/articles/delete/${id}`)
     console.log(response.data)
     return response.data
}

const getposts = async()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await axios.get('http://localhost:5000/api/articles/getarticles',
    {headers: {
        'token':user.token
    }
}
    )
    return res.data
}

const articleServices = {
    createArticle,
    getposts,
    addArticleid,
    updateArticle,
    deleteArticle,
    likeArticle
}
export default articleServices