"use client";
import React from "react";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function DisplayUser({params}:any){
    const [item,setItem]=React.useState({
        name:"",
        price:""
    });
    const [isloading,setIsLoading]=React.useState(true);
    const [isAdded,setIsAdded]=React.useState(false);
    const [data,setData]:any=React.useState({});
    const [itemsDetails,setItemsDetails]=React.useState([]);
    let router=useRouter();
    async function deleteItem(index:any){
        try{
            let itemData={id:params.id,index:index};
            let response=await axios.post('/api/users/deleteItem',itemData);
            setIsAdded(!isAdded);
        }catch(error:any){
            console.log(error);
        }
    }
    async function deleteUser(){
        try {
            let data:any={id:params.id};
            let response=await axios.post("/api/users/deleteUser",data)
            router.push("/display");
        } catch (error) {
            console.log(error);
        }
    }
    async function getUserData(){
        try{
            let response=await axios.post('/api/users/getUser',{id:params.id});
            setItemsDetails(response.data.itemsDetails);
            setData(response.data._doc);
            setIsLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    async function addItem(){
        if(item.price!="" && item.price!=="0"){
            let itemData={
                ...item,
                id:params.id,
                date:new Date()
            }
            try{
                let response=await axios.post('/api/users/addItem',itemData);
                setItem({
                    name:"",
                    price:""
                });
                setIsAdded(!isAdded);
            }catch(error){
                console.log(error);
            }
        }
    }
    React.useEffect(()=>{
        getUserData();
    },[isAdded]);
    return(
        <div className="min-h-[100vh] w-[100vw]">
            <NavBar/>
            {isloading?<div className="py-2 px-5 rounded-lg mt-5 text-white bg-green-900 w-[10vw] text-center mx-auto">Loading</div>:
            <div>
                <h1 className="text-center text-2xl my-3">User Information</h1>
                <div className="flex py-2 px-5 items-center place-content-center">
                    <div className="mx-auto">
                        <div className="text-3xl font-bold text-blue-500 underline">{data.userName}</div>
                        <div className="text-2xl font-bold text-green-600">{data.mobileNo}</div>
                        <div className="my-3">
                            <div className="text-xl">Relative Name: <span className="text-2xl text-orange-600 font-semibold">{data.relativeName}</span></div>
                            <div className="text-xl">Relation: <span className="text-2xl text-orange-600 font-semibold">{data.relation}</span></div>
                        </div>
                        <div className="my-3 text-xl">Address:<br/><span className="text-2xl text-lime-700 font-bold">{data.address}</span></div>
                        <div className="text-lg my-1">Entry Open Date: {new Date(data.createdDate).getDate()}-{new Date(data.createdDate).getMonth()}-{new Date(data.createdDate).getFullYear()}</div>
                        <div className="text-lg my-1">Last Modify Date: {new Date(data.modifyDate).getDate()}-{new Date(data.modifyDate).getMonth()}-{new Date(data.modifyDate).getFullYear()}</div>
                    </div>
                    <div className="mx-auto flex flex-col items-center place-content-center">
                        <div className="flex items-center place-content-center text-cyan-600 font-bold  text-7xl md:text-9xl shadow-lg p-7 bg-slate-300 rounded-lg w-[15vw]">&#8471;</div>
                        <div className="flex">
                                <Link className="mt-5 bg-slate-900 text-white hover:bg-slate-400 hover:text-black hover:font-semibold cursor-pointer py-2 px-3 rounded-lg mx-3 text-center" href={`/update/${params.id}`}>Update User</Link>
                                <button className="mt-5 bg-slate-900 text-white hover:bg-slate-400 hover:text-black hover:font-semibold cursor-pointer py-2 px-3 rounded-lg mx-3  text-center" onClick={deleteUser}>Delete user</button>
                        </div>
                    </div>
                </div>
                <h1 className="text-center text-2xl my-3">Record History</h1>
                <div>
                    {   
                        itemsDetails.map((val:any,index:any)=>(
                            <div className="flex place-content-center items-center w-[100vw]" key={index}>
                            <div className="bg-slate-300 rounded-lg my-5 py-2 px-5 w-[60vw] shadow-lg">
                                <h1 className="text-3xl text-center font-bold text-orange-600 my-3">{new Date(val[0].date).getDate()}-{new Date(val[0].date).getMonth()}-{new Date(val[0].date).getFullYear()}</h1>
                                {val.map((newval:any,ind:any)=>(
                                    <div key={ind}>
                                        {
                                            newval.name==="cash" || newval.name==="Cash" || newval.name==="CASH"?
                                                <div className="flex place-content-between bg-green-400 py-3 px-5 rounded-md">
                                                <div className="text-xl text-yellow-900 font-semibold">{ind+1}.</div>
                                                <div className="text-2xl text-cyan-800 font-bold">{newval.name}</div>
                                                <div className="text-2xl text-zinc-600 font-bold">Rs.{newval.price}</div>
                                                <button className="p-2 hover:bg-slate-400 cursor-pointer rounded-lg" onClick={()=>{deleteItem(newval.index)}}>&#10060;</button>
                                                </div>
                                            :
                                                <div className="flex place-content-between py-3 px-5">
                                                <div className="text-xl text-yellow-900 font-semibold">{ind+1.}</div>
                                                <div className="text-2xl text-cyan-800 font-bold">{newval.name}</div>
                                                <div className="text-2xl text-zinc-600 font-bold">Rs.{newval.price}</div>
                                                <button className="p-2 hover:bg-slate-400 cursor-pointer rounded-lg" onClick={()=>{deleteItem(newval.index)}}>&#10060;</button>
                                                </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex place-content-center text-2xl my-4 text-red-500 font-extrabold underline">Current Balance: <span>{data.balance}</span></div>
                <div className="py-2 px-5 flex flex-col md:flex-row place-content-center items-center">
                    <input type="text" placeholder="Enter Item" className="bg-slate-300 py-3 px-5 rounded-lg text-lg mx-3 my-3 placeholder:text-blue-500" value={item.name} onChange={(e)=>{setItem({...item,name:e.target.value})}}/>
                    <input type="number" placeholder="Price" className="bg-slate-300 py-3 px-5 rounded-lg text-lg mx-3  my-3 placeholder:text-blue-500" value={item.price} onChange={(e)=>{setItem({...item,price:e.target.value})}}/>
                    <button className="mt-5 bg-slate-900 text-white hover:bg-slate-400 hover:text-black hover:font-semibold cursor-pointer py-2 px-3 rounded-lg mx-3" onClick={addItem}>Add Item</button>
                </div>
            </div>}
            
        </div>
    );
}