"use client";
import NavBar from "@/Components/NavBar";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const inputClass = "w-full border border-slate-200 bg-white px-4 py-2.5 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export default function Update({ params }: any) {
    const router = useRouter();
    const [isloading1, setIsLoading1] = React.useState(false);
    const [isloading2, setIsLoading2] = React.useState(true);
    const [user, setUser] = React.useState({
        userName: "",
        mobileNo: "",
        relativeName: "",
        relation: "",
        address: ""
    });

    const getUser = React.useCallback(async () => {
        try {
            const response = (await axios.post("/api/users/getUser", { id: params.id })).data._doc;
            setUser({
                userName: response.userName,
                mobileNo: response.mobileNo,
                relativeName: response.relativeName,
                relation: response.relation,
                address: response.address
            });
            setIsLoading2(false);
        } catch (error: any) {
            console.log(error);
        }
    }, [params.id]);

    async function updateUser() {
        setIsLoading1(true);
        try {
            await axios.post("/api/users/updateUser", { ...user, id: params.id });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading1(false);
            router.push(`/display/${params.id}`);
        }
    }

    React.useEffect(() => { getUser(); }, [getUser]);

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-14">
                <div className="max-w-lg mx-auto px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>
                        <p className="text-slate-500 mt-1 text-sm">Update the customer details below</p>
                    </div>

                    {isloading2 ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i}>
                                    <div className="h-3 bg-slate-200 rounded w-1/4 mb-2" />
                                    <div className="h-10 bg-slate-200 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">User Name</label>
                                    <input type="text" className={inputClass} placeholder="Enter full name" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                                    <input type="number" className={inputClass} placeholder="Enter mobile number" value={user.mobileNo} onChange={(e) => setUser({ ...user, mobileNo: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Relative Name</label>
                                        <input type="text" className={inputClass} placeholder="Name" value={user.relativeName} onChange={(e) => setUser({ ...user, relativeName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Relation</label>
                                        <input type="text" className={inputClass} placeholder="e.g. Father" value={user.relation} onChange={(e) => setUser({ ...user, relation: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                                    <textarea rows={3} className={inputClass} placeholder="Enter full address" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    className="flex-1 bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={updateUser}
                                    disabled={isloading1}
                                >
                                    {isloading1 ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    className="px-4 py-2.5 bg-white text-slate-600 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 transition"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}