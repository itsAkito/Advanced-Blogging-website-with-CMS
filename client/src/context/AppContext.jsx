
import { createContext } from "react"
import axios from "axios"
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";


axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
const AppContext=createContext();
export const AppProvider=({children})=>{
    // const navigate=useNavigate()

    const [token,setToken]=useState(null)
    const[blogs,setBlogs]=useState([])
    const[input,setInput]=useState("")

    const fetchBlog=async()=>{
        try{
            const {data}=await axios.get('/api/add/all');
            if(data.success){
                setBlogs(data.blogs)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        const storedtoken=localStorage.getItem('token')
        if(storedtoken && storedtoken !== 'undefined'){
            // const parsedToken=JSON.parse(storedtoken)
                const cleanToken = storedtoken.replace(/^"+|"+$/g, "");
            setToken(storedtoken)
            // localStorage.setItem("token",storedtoken)
            axios.defaults.headers.common['Authorization']=storedtoken
            // console.log("Token:", storedtoken);

        }
          fetchBlog();
    },[])
     const value={
        axios,token,setToken,blogs,setBlogs,input,setInput
     }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext=()=>{
    return useContext(AppContext)
}