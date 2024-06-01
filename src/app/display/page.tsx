"use client";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import Link from "next/link";
import React from "react";
export default function Display(){
    const [searchType,setsearchType]=React.useState("userName");
    const [search,setSearch]=React.useState("");
    const [isloading,setIsLoading]=React.useState(true);
    const [data,setData]=React.useState([]);
    const [actualData,setActualData]=React.useState([]);
    async function getAllUsers(){
        try{
            let result=await axios.get("/api/users/getAllUsers");
            setData(result.data.userData);
            setActualData(result.data.userData);
            setIsLoading(false);
        }catch(error:any){
            console.log(error);
        }
    }
    React.useEffect(()=>{
        getAllUsers();
    },[]);
    React.useEffect(()=>{
        if(searchType==="userName"){
            setData(actualData.filter((val:any)=>{ return val.userName.includes(search)}));
        }
        else if(searchType==="relativeName"){
            setData(actualData.filter((val:any)=>{ return val.relativeName.includes(search)}));
        }
        else if(searchType==="address"){
            setData(actualData.filter((val:any)=>{ return val.address.includes(search)}));
        }
        else if(searchType==="balanceGT"){
            setData(actualData.filter((val:any)=>{ return val.balance>=Number(search)}));
        }
        else if(searchType==="balanceLT"){
            setData(actualData.filter((val:any)=>{ return val.balance<=Number(search)}));
        }
    },[search,searchType])
    return(
        <div className="h-auto min-h-[100vh]">
            <NavBar/>
            <h1 className="text-center text-2xl my-3">List of All Users</h1>
            <div className="flex mx-3 my-5 items-center place-content-center flex-col md:flex-row ">
                <input type="text" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} className="py-2 px-5 md:w-[50vw] xl:w-[60vw] mx-auto rounded-lg my-4" />
                <div className="mx-auto">
                    <label htmlFor="searchBy" className="text-xl">Search By</label>
                    <select id="searchBy" className="px-2 py-2 rounded-lg" onChange={(e)=>{setsearchType(e.target.value)}}>
                    <option value="userName">Name</option>
                    <option value="relativeName">Relative Name</option>
                    <option value="address">Address</option>
                    <option value="balanceGT">Balance Greater Than</option>
                    <option value="balanceLT">Balance Less Than</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center place-content-center flex-col">
            {isloading?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900 w-[10vw] text-center">Loading</div>:
            <div>
                {data.map((val:any)=>(
                    <Link key={val.id} href={`/display/${val.id}`} className="flex w-[60vw] place-content-between py-2 px-3 my-3 bg-slate-300 rounded-lg shadow-lg">
                        <div className="w-[20vw]">
                            <div className="font-bold text-blue-600 text-3xl">{val.userName}</div>
                            <div className="text-xl text-teal-900 font-bold">{val.relativeName}<span className="text-sm text-red-500"> ({val.relation})</span></div>
                            <div className="text-black text-xl w-[10vw]">{val.mobileNo}</div>
                            <div className="text-red-500 font-semibold text-xl w-[10vw]">Balance: {val.balance}</div>
                        </div>
                        <div className="text-black text-xl w-[30vw]">Address:<br/><span className="text-xl font-bold text-cyan-800">{val.address}</span></div>
                    </Link>
                ))}
            </div>
            }
            </div>
        </div>
    );
}