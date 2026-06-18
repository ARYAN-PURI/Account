"use client";
import NavBar from "@/Components/NavBar";
import React from "react";
import axios from "axios";
import Link from "next/link";

function formatDate(d: any) {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default function Records() {
    const [recordsData, setRecordsData] = React.useState([]);
    const [isloading, setIsLoading] = React.useState(true);
    const [dailyData, setDailyData]: any = React.useState([]);

    async function getRecords() {
        try {
            const response = await axios.get("/api/users/getRecords");
            setDailyData(response.data.dailyData);
            setRecordsData(response.data.rData);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    }

    React.useEffect(() => { getRecords(); }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-14">
                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Records</h1>
                        <p className="text-slate-500 mt-1 text-sm">Daily transaction history</p>
                    </div>

                    {isloading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                                    <div className="h-5 bg-slate-200 rounded w-1/4 mb-4" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {recordsData.length === 0 && (
                                <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-xl border border-slate-200">No records found.</div>
                            )}
                            {recordsData.map((val: any, index: any) => (
                                <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                                        <span className="text-sm font-semibold text-slate-700">{formatDate(val[0].date)}</span>
                                        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                            <span>Sale: <strong className="text-slate-700">₹{dailyData[index]?.sale}</strong></span>
                                            <span>Cash: <strong className="text-green-600">₹{dailyData[index]?.cashCollected}</strong></span>
                                            <span>Lend: <strong className="text-red-500">₹{dailyData[index]?.lendMoney}</strong></span>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {val.map((newval: any, ind: any) => {
                                            const isCash = newval.name === "cash";
                                            return (
                                                <div key={ind} className={`flex items-start justify-between px-4 py-3 gap-3 ${isCash ? "bg-green-50" : ""}`}>
                                                    <div className="flex items-start gap-2 min-w-0 flex-1">
                                                        <span className="text-xs text-slate-400 shrink-0 mt-0.5">{ind + 1}.</span>
                                                        <div className="min-w-0">
                                                            <Link href={`/display/${newval.id}`} className="text-sm font-medium text-indigo-600 hover:underline block truncate">
                                                                {newval.userName}
                                                                {newval.mobileNo && <span className="text-slate-400 ml-1 font-normal hidden sm:inline">({newval.mobileNo})</span>}
                                                            </Link>
                                                            <span className={`text-xs mt-0.5 block ${isCash ? "text-green-700 font-medium" : "text-slate-500"}`}>{newval.name}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 shrink-0">₹{newval.price}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}