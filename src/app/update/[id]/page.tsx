"use client";
import NavBar from "@/Components/NavBar";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Update({params}:any){
    let router=useRouter();
    const [isUserAdded,setIsUserAdded]=React.useState(false);
    const [isloading1,setIsLoading1]=React.useState(false);
    const [isloading2,setIsLoading2]=React.useState(true);
    const [user,setUser]=React.useState({
        userName:"",
        mobileNo:"",
        relativeName:"",
        relation:"",
        address:""
    });
    async function getUser(){
        try{
            let data={id:params.id}
            let response=(await axios.post("/api/users/getUser",data)).data._doc;
            setUser({
                userName:response.userName,
                mobileNo:response.mobileNo,
                relativeName:response.relativeName,
                relation:response.relation,
                address:response.address
            });
            setIsLoading2(false);
        }catch(error:any){
            console.log(error);
        }
    }
    async function updateUser(){
        setIsLoading1(true);
        try{
            let data={...user,id:params.id}
            let response=await axios.post("/api/users/updateUser",data);
            if(response.status===200){
                setIsUserAdded(true);
            }
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading1(false);
            router.push(`/display/${params.id}`);
        }
    }
    React.useEffect(()=>{
        getUser();
    },[]);
    return(
        <div className="min-h-[100vh]">
            <NavBar/>
            <h1 className="text-2xl text-center my-3">Update User Details</h1>
            {isloading2?<div className="flex items-center place-content-center"><div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900">Loading</div></div>
            :
            <div className="flex flex-col items-center place-content-center">
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="User Name" value={user.userName} onChange={(e)=>{setUser({...user,userName:e.target.value})}}/>
            <input type="number" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Mobile No" value={user.mobileNo} onChange={(e)=>{setUser({...user,mobileNo:e.target.value})}}/>
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Relative Name" value={user.relativeName} onChange={(e)=>{setUser({...user,relativeName:e.target.value})}}/>
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Relation" value={user.relation} onChange={(e)=>{setUser({...user,relation:e.target.value})}}/>
            <textarea  className="placeholder:text-blue-500 bg-slate-300 py-2 px-6 rounded-lg" placeholder="Address" value={user.address} onChange={(e)=>{setUser({...user,address:e.target.value})}}/>
            <button className="mt-5 bg-slate-900 text-white hover:bg-slate-400 hover:text-black hover:font-semibold cursor-pointer py-2 px-3 rounded-lg" onClick={updateUser}>Update User</button>
            {isUserAdded?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900">User Updated SuccesFully</div>:""}
            {isloading1?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900">Loading</div>:""}
            </div>
            }
            
        </div>
    );
}