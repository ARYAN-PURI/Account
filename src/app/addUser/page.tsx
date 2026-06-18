"use client"
import React from "react";
import NavBar from "@/Components/NavBar";
import axios from "axios";

const inputClass = "w-full border border-slate-200 bg-white px-4 py-2.5 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export default function AddUser() {
    const [isUserAdded, setIsUserAdded] = React.useState(false);
    const [isloading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        userName: "",
        mobileNo: "",
        relativeName: "",
        relation: "",
        address: ""
    });

    async function addUser() {
        if (user.userName !== "" && user.address !== "") {
            setIsLoading(true);
            setIsUserAdded(false);
            try {
                const response = await axios.post("/api/users/addUser", user);
                if (response.status === 200) {
                    setIsUserAdded(true);
                    setUser({ userName: "", mobileNo: "", relativeName: "", relation: "", address: "" });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-14">
                <div className="max-w-lg mx-auto px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
                        <p className="text-slate-500 mt-1 text-sm">Fill in the customer details below</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">User Name <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                                <textarea rows={3} className={inputClass} placeholder="Enter full address" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={addUser}
                            disabled={isloading}
                        >
                            {isloading ? "Adding..." : "Add User"}
                        </button>

                        {isUserAdded && (
                            <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
                                User added successfully!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}