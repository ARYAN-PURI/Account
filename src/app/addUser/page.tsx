"use client"
import React from "react";
import NavBar from "@/Components/NavBar";
import axios from "axios";
export default function AddUser(){
    const [isUserAdded,setIsUserAdded]=React.useState(false);
    const [isloading,setIsLoading]=React.useState(false);
    const [user,setUser]=React.useState({
        userName:"",
        mobileNo:"",
        relativeName:"",
        relation:"",
        address:""
    });
    async function addUser(){
        setIsLoading(true);
        try{
            let response=await axios.post("/api/users/addUser",user);
            if(response.status===200){
                setIsUserAdded(true);
            }
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    return(
            <div className="h-[100vh]">
            <NavBar/>
            <h1 className="text-center text-2xl my-5">Enter User Details</h1>
            <div className="flex flex-col items-center place-content-center">
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="User Name" value={user.userName} onChange={(e)=>{setUser({...user,userName:e.target.value})}}/>
            <input type="number" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Mobile No" value={user.mobileNo} onChange={(e)=>{setUser({...user,mobileNo:e.target.value})}}/>
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Relative Name" value={user.relativeName} onChange={(e)=>{setUser({...user,relativeName:e.target.value})}}/>
            <input type="text" className="placeholder:text-blue-500 bg-slate-300 my-3 px-4 py-2 text-slate-900 rounded-lg" placeholder="Relation" value={user.relation} onChange={(e)=>{setUser({...user,relation:e.target.value})}}/>
            <textarea  className="placeholder:text-blue-500 bg-slate-300 py-2 px-6 rounded-lg" placeholder="Address" value={user.address} onChange={(e)=>{setUser({...user,address:e.target.value})}}/>
            <button className="mt-5 bg-slate-900 text-white hover:bg-slate-400 hover:text-black hover:font-semibold cursor-pointer py-2 px-3 rounded-lg" onClick={addUser}>Add User</button>
            {isUserAdded?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900">User Added SuccesFully</div>:""}
            {isloading?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900">Loading</div>:""}
            </div>
        </div>
    );
}