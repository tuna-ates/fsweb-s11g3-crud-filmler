import axios from "axios";
import { useState } from "react"


export const REG_TYPE={
    GET:"get",
    POST:"post",
    PUT:"put",
    DELETE:"delete"
}

export const UseAxios=(initialData)=>{
   const [data,setData]=useState(initialData);
   const [loading,setLoading]=useState(false);
   const [error,setError]=useState("");

   const requestDo=({reqType=REG_TYPE.GET,endPoint,payload})=>{
    axios[reqType](endPoint,payload)
    .then((res)=>{
        setData(res.data)
        console.log("dataDEnem:",res.data);
    })
    .catch((err)=>{
        setError(err.message);
        console.log("errorVerdi");
    })
    .finally(()=>setLoading(false));
    
   }
   return[requestDo,data,loading,error]
}
