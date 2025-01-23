import axios from "axios"

const AxiosService = axios.create({
    baseURL:"https://blogapp-backend-1-mezn.onrender.com",
    headers:{
        "Content-Type":"application/json"
    }
})


export default AxiosService