import axios from "axios";

//set up default url for axios
export const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json", 
    }
});

//function getdata by endpoint url
export const axiosApi = async (endPointUrl) => {
    try {
        const res = await axiosInstance.get(endPointUrl);
        return res.data;
    } catch (err) {
        console.log(">>> Message error: ", err.message);
        throw new Error();
    }
}
// function add new dâta
export const addCar = async (endPointUrl,newData) => {
    try {
        const res = await axiosInstance.post(endPointUrl, newData);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
        throw new Error();
    }
}

// function update data
export const updateCar = async (endPointUrl, updatedData) => {
    try {
        const res = await axiosInstance.put(endPointUrl, updatedData);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
        throw new Error();
    }
}

// function delete data
export const deleteCar = async (endPointUrl) => {
    try {
        const res = await axiosInstance.delete(endPointUrl);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
        throw new Error();
    }
}
