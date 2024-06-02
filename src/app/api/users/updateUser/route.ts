import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export const revalidate = 0;
export async function POST(req:NextRequest){
    try {
        let reqBody=await req.json();
        let user=await userModel.findOne({_id:reqBody.id});
        user.userName=reqBody.userName;
        user.mobileNo=reqBody.mobileNo;
        user.relativeName=reqBody.relativeName;
        user.relation=reqBody.relation;
        user.address=reqBody.address;
        let response=await user.save();
        return NextResponse.json({message:"User Updated Success",success:true,...response},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error,message:"Error occur at update user api"},{status:500});
    }
}