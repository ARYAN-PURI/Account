import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
export const revalidate = 0;
connect();
export async function POST(req:NextRequest){
    try{
        let reqBody=await req.json();
        let newUser=new userModel({
            ...reqBody,
            createdDate:new Date(),
            balance:0
        })
        let result=await newUser.save();
        return NextResponse.json({message:"User Created SuccessFully",success:true,result},{status:200});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error, message:"Error at Create User Api"},{status:500})
    }
}