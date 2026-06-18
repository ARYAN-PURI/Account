"use client";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function Display() {
    const [searchType, setsearchType] = React.useState("userName");
    const [search, setSearch] = React.useState("");
    const [isloading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [actualData, setActualData] = React.useState([]);

    async function getAllUsers() {
        try {
            const result = await axios.get("/api/users/getAllUsers");
            setData(result.data.userData);
            setActualData(result.data.userData);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    }

    React.useEffect(() => { getAllUsers(); }, []);

    React.useEffect(() => {
        if (searchType === "userName") setData(actualData.filter((val: any) => val.userName.includes(search)));
        else if (searchType === "relativeName") setData(actualData.filter((val: any) => val.relativeName.includes(search)));
        else if (searchType === "address") setData(actualData.filter((val: any) => val.address.includes(search)));
        else if (searchType === "balanceGT") setData(actualData.filter((val: any) => val.balance >= Number(search)));
        else if (searchType === "balanceLT") setData(actualData.filter((val: any) => val.balance <= Number(search)));
    }, [search, searchType, actualData]);

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-14">
                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
                        <p className="text-slate-500 mt-1 text-sm">Search and manage customer accounts</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 border border-slate-200 bg-white px-4 py-2.5 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <select
                            className="border border-slate-200 bg-white px-4 py-2.5 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            onChange={(e) => setsearchType(e.target.value)}
                        >
                            <option value="userName">Name</option>
                            <option value="relativeName">Relative Name</option>
                            <option value="address">Address</option>
                            <option value="balanceGT">Balance &ge; </option>
                            <option value="balanceLT">Balance &le; </option>
                        </select>
                    </div>

                    {isloading ? (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
                                    <div className="h-5 bg-slate-200 rounded w-1/3 mb-3" />
                                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.length === 0 && (
                                <div className="text-center py-12 text-slate-400 text-sm">No users found.</div>
                            )}
                            {data.map((val: any) => (
                                <Link key={val.id} href={`/display/${val.id}`} className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-sm transition">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-lg text-slate-900 truncate">{val.userName}</div>
                                            <div className="text-sm text-slate-500 mt-0.5">
                                                {val.relativeName && <span>{val.relativeName} <span className="text-slate-400">({val.relation})</span></span>}
                                            </div>
                                            <div className="text-sm text-slate-500 mt-1">{val.mobileNo}</div>
                                            <div className="text-sm text-slate-500 mt-0.5 truncate">{val.address}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-xs text-slate-400 mb-1">Balance</div>
                                            <div className={`text-lg font-bold ${val.balance > 0 ? "text-red-500" : "text-green-600"}`}>
                                                ₹{val.balance}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}