"use client";
import React from "react";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatDate(d: any) {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const inputClass = "border border-slate-200 bg-white px-4 py-2.5 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export default function DisplayUser({ params }: any) {
    const [item, setItem] = React.useState({ name: "", price: "" });
    const [isloading, setIsLoading] = React.useState(true);
    const [isAdded, setIsAdded] = React.useState(false);
    const [data, setData]: any = React.useState({});
    const [itemsDetails, setItemsDetails] = React.useState([]);
    const router = useRouter();

    async function deleteItem(index: any) {
        try {
            await axios.post('/api/users/deleteItem', { id: params.id, index });
            setIsAdded(!isAdded);
        } catch (error: any) {
            console.log(error);
        }
    }

    async function deleteUser() {
        try {
            await axios.post("/api/users/deleteUser", { id: params.id });
            router.push("/display");
        } catch (error) {
            console.log(error);
        }
    }

    const getUserData = React.useCallback(async () => {
        try {
            const response = await axios.post('/api/users/getUser', { id: params.id });
            setItemsDetails(response.data.itemsDetails);
            setData(response.data._doc);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [params.id]);

    async function addItem() {
        if (item.price !== "" && item.price !== "0") {
            try {
                await axios.post('/api/users/addItem', { ...item, id: params.id, date: new Date() });
                setItem({ name: "", price: "" });
                setIsAdded(!isAdded);
            } catch (error) {
                console.log(error);
            }
        }
    }

    React.useEffect(() => { getUserData(); }, [isAdded, getUserData]);

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-14">
                {isloading ? (
                    <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                                <div className="h-5 bg-slate-200 rounded w-1/4 mb-3" />
                                <div className="h-4 bg-slate-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">{data.userName}</h1>
                                    <p className="text-slate-500 text-sm mt-0.5">{data.mobileNo}</p>
                                    {data.relativeName && (
                                        <p className="text-sm text-slate-500 mt-1">
                                            {data.relativeName} <span className="text-slate-400">({data.relation})</span>
                                        </p>
                                    )}
                                    <p className="text-sm text-slate-500 mt-1">{data.address}</p>
                                    <div className="flex gap-4 mt-3 text-xs text-slate-400">
                                        <span>Created: {formatDate(data.createdDate)}</span>
                                        <span>Modified: {formatDate(data.modifyDate)}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-400 mb-1">Current Balance</div>
                                    <div className={`text-3xl font-bold ${data.balance > 0 ? "text-red-500" : "text-green-600"}`}>
                                        ₹{data.balance}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-slate-100">
                                <Link
                                    href={`/update/${params.id}`}
                                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Edit User
                                </Link>
                                <button
                                    onClick={deleteUser}
                                    className="px-4 py-2 text-sm font-medium bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-slate-700 mb-4">Add Entry</h2>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Item name (or &quot;cash&quot;)"
                                    className={`flex-1 ${inputClass}`}
                                    value={item.name}
                                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Price (₹)"
                                    className={`sm:w-36 ${inputClass}`}
                                    value={item.price}
                                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                                />
                                <button
                                    onClick={addItem}
                                    className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-slate-700 mb-3">Record History</h2>
                            <div className="space-y-4">
                                {itemsDetails.length === 0 && (
                                    <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-xl border border-slate-200">No records yet.</div>
                                )}
                                {itemsDetails.map((val: any, index: any) => (
                                    <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                                            <span className="text-sm font-semibold text-slate-600">{formatDate(val[0].date)}</span>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {val.map((newval: any, ind: any) => {
                                                const isCash = ["cash", "Cash", "CASH"].includes(newval.name);
                                                return (
                                                    <div key={ind} className={`flex items-center justify-between px-5 py-3 ${isCash ? "bg-green-50" : ""}`}>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs text-slate-400 w-5">{ind + 1}.</span>
                                                            <span className={`text-sm font-medium ${isCash ? "text-green-700" : "text-slate-700"}`}>{newval.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-semibold text-slate-700">₹{newval.price}</span>
                                                            <button
                                                                onClick={() => deleteItem(newval.index)}
                                                                className="text-slate-300 hover:text-red-500 transition text-lg leading-none"
                                                                title="Delete"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}