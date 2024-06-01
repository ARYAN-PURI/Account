"use client";
import NavBar from "@/Components/NavBar";
import React from "react";
import axios from "axios";
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
                {recordsData.map((val:any,ind:any)=>(
                    <div className="flex place-content-center items-center w-[100vw] flex-col">
                    <div className="bg-red-300 rounded-lg my-5 py-2 px-5 w-[60vw]">
                        <h1 className="text-3xl text-center">{new Date(val[0].date).getDate()}-{new Date(val[0].date).getMonth()}-{new Date(val[0].date).getFullYear()}</h1>
                        {val.map((newval:any,ind:any)=>(
                            <div>
                                {
                                    newval.name==="cash"?
                                        <div className="flex place-content-evenly my-2 bg-green-400 p-2 rounded-md">
                                        <div className="text-2xl">{ind+1}.</div>
                                        <div className="text-2xl">{newval.userName}({newval.mobileNo})</div>
                                        <div className="text-2xl">{newval.name}</div>
                                        <div className="text-2xl">Rs.{newval.price}</div>
                                        </div>
                                    :
                                        <div className="flex place-content-evenly my-2">
                                        <div className="text-2xl">{ind+1.}</div>
                                        <div className="text-2xl">{newval.userName}({newval.mobileNo})</div>
                                        <div className="text-2xl">{newval.name}</div>
                                        <div className="text-2xl">Rs.{newval.price}</div>
                                        </div>
                                }
                            </div>
                        ))}
                    </div>
                        <div className="flex items-center">
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Sale: {dailyData[ind].sale}
                            </div>
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Cash Collected: {dailyData[ind].cashCollected}
                            </div>
                            <div className="mx-5 text-2xl text-slate-900 font-bold underline mb-9">
                                Lend Money: {dailyData[ind].lendMoney}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
    );
}