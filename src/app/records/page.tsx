"use client";
import NavBar from "@/Components/NavBar";
import React from "react";
import axios from "axios";
import Link from "next/link";
export default function Records(){
    const [recordsData,setRecordsData]=React.useState([]);
    const [isloading,setIsLoading]=React.useState(true);
    const [dailyData,setDailyData]:any=React.useState([]);
    async function getRecords(){
        try {
            let response=await axios.get("/api/users/getRecords");
            setDailyData(response.data.dailyData);
            setRecordsData(response.data.rData);
            setIsLoading(false);
        } catch (error:any) {
            console.log(error);
        }
    }
    React.useEffect(()=>{
        getRecords();
    },[])
    return(
        <div className="min-h-[100vh]">
            <NavBar/>
            <h1 className="text-2xl text-center my-3" >Records</h1>
            {isloading?<div className="flex place-content-center"><div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900 w-[10vw] text-center mx-auto">Loading</div></div>
            :
            <div>
                {recordsData.map((val:any,index:any)=>(
                    <div className="flex place-content-center items-center w-[100vw] flex-col" key={index}>
                    <div className="bg-slate-300 shadow-lg rounded-lg my-5 py-2 px-5 w-[70vw]">
                        <h1 className="text-3xl text-center font-bold text-orange-600 my-3">{new Date(val[0].date).getDate()}-{new Date(val[0].date).getMonth()}-{new Date(val[0].date).getFullYear()}</h1>
                        {val.map((newval:any,ind:any)=>(
                            <div key={ind}>
                                {
                                    newval.name==="cash"?
                                        <div className="flex place-content-between my-2 bg-green-300 py-3 px-5 rounded-md">
                                        <div className="text-xl text-yellow-900 font-semibold">{ind+1}.</div>
                                        <Link  href={`/display/${newval.id}`} className="text-2xl text-blue-700 font-bold">{newval.userName}<div className="text-red-500 text-xl font-semibold">({newval.mobileNo})</div></Link>
                                        <div className="text-2xl text-cyan-800 font-bold">{newval.name}</div>
                                        <div className="text-2xl text-zinc-600 font-bold">Rs.{newval.price}</div>
                                        </div>
                                    :
                                        <div className="flex place-content-between py-2 px-5">
                                        <div className="text-xl text-yellow-900 font-semibold">{ind+1.}</div>
                                        <Link href={`/display/${newval.id}`} className="text-2xl text-blue-700 font-bold">{newval.userName}<div className="text-red-500 text-xl font-semibold">({newval.mobileNo})</div></Link>
                                        <div className="text-2xl text-cyan-800 font-bold">{newval.name}</div>
                                        <div className="text-2xl text-zinc-600 font-bold">Rs.{newval.price}</div>
                                        </div>
                                }
                            </div>
                        ))}
                    </div>
                        <div className="flex items-center">
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Sale: {dailyData[index].sale}
                            </div>
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Cash Collected: {dailyData[index].cashCollected}
                            </div>
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Lend Money: {dailyData[index].lendMoney}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
    );
}