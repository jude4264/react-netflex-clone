import axios from "axios";


const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params : {
        api_key : "a104bdc5b76fa499f7771e953f77c92c",
        language : "ko-KR"
    }
})

export default instance

