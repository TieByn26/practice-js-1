import axios from "axios";

// Set up default URL for axios
export const axiosInstance = axios.create({
    baseURL: "/api", 
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

// Function get data by endpoint url
export const axiosApiGetData = async (endPointUrl) => {
    try {
        const res = await axiosInstance.get(endPointUrl);
        return res.data;
    } catch (err) {
        console.log(">>> Message error: ", err.message);
    }
};

// Function add new data
export const axiosApiAddData = async (endPointUrl, newData) => {
    try {
        const res = await axiosInstance.post(endPointUrl, newData);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
    }
};

// Function update data
export const axiosApiUpdateData = async (endPointUrl, updatedData) => {
    try {
        const res = await axiosInstance.put(endPointUrl, updatedData);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
    }
};

// Function delete data
export const axiosApiDeleteData = async (endPointUrl) => {
    try {
        const res = await axiosInstance.delete(endPointUrl);
        return res.data;
    } catch (err) {
        console.log(">>> Message error:", err.message);
    }
};