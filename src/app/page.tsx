"use client";
import NarBar from "@/Components/NavBar";
import axios from "axios";
import React from "react";
export default function Home() {
  let [data,setData]:any=React.useState({});
  const [isloading,setIsLoading]=React.useState(true);
  async function getData(){
    try{
      let response=await axios.get("/api/users/getNumbers");
      setData(response.data);
      setIsLoading(false);
      }catch(error:any){
      console.log(error);
    }
  }
  React.useEffect(()=>{
    getData();
  },[]);
  return (
        <div className="h-[100vh]">
        <NarBar/>
        <h1 className="underline text-5xl font-sans h-[50vh] flex place-content-center items-center">Puri Cloth House</h1>
        {isloading?<div className="flex items-center place-content-center"><div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900 w-[10vw] text-center">Loading</div></div>
        :
        <div className="flex place-content-evenly">
          <div>
            <div className="text-bg-slate-900 text-2xl my-2 underline font-semibold">No of Users</div>
            <div className="text-3xl text-green-500 font-extrabold">{data.nfUsers}</div>
          </div>
          <div>
            <div className="text-bg-slate-900 text-2xl my-2 underline font-semibold">Total Sale</div>
            <div className="text-3xl text-green-500 font-extrabold">{data.sale}</div>
          </div>
          <div>
            <div className="text-bg-slate-900 text-2xl my-2 underline font-semibold">Cash Collected</div>
            <div className="text-3xl text-green-500 font-extrabold">{data.cash}</div>
          </div>
          <div>
            <div className="text-bg-slate-900 text-2xl my-2 underline font-semibold">Lend Money</div>
            <div className="text-3xl text-green-500 font-extrabold">{data.lend}</div>
          </div>
        </div>}
        </div>
  );
}
