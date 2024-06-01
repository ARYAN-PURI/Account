import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export async function POST(req:NextRequest){
    try{
        let reqBody=await req.json();
        let response=await userModel.deleteOne({_id:reqBody.id});
        return NextResponse.json({message:"User Deleted Success",success:true,...response},{status:200});
    }catch(error:any){
        return NextResponse.json({error:error,message:"Error occur at delete user api"},{status:500});
    }
    
} 