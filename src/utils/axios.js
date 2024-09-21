import axios from "axios";

//set up default url for axios
export const axiosIntance = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers:{
        "Content-Type":"aplication/json",
    }
});
//function getdata by endpoint url
export const axiosApi = async (endPointUrl) =>{
    try {
        const res = await axios.get(endPointUrl);
        return res.data;
    } catch(err){
        console.log(">>>message error: ",err.message);
        throw new error();
    }
}
