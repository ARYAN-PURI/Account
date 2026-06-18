"use client";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import React from "react";

const stats = [
  { key: "nfUsers", label: "Total Users", prefix: "" },
  { key: "sale", label: "Total Sale", prefix: "₹" },
  { key: "cash", label: "Cash Collected", prefix: "₹" },
  { key: "lend", label: "Lend Money", prefix: "₹" },
];

export default function Home() {
  const [data, setData]: any = React.useState({});
  const [isloading, setIsLoading] = React.useState(true);

  async function getData() {
    try {
      const response = await axios.get("/api/users/getNumbers");
      setData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <div className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Overview of Puri Cloth House accounts</p>
          </div>

          {isloading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4" />
                  <div className="h-8 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.key} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                    {stat.prefix}{data[stat.key] ?? 0}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
