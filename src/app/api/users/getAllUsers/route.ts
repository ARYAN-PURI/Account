import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
export const revalidate = 0;
connect();
export async function GET(){
    try{
    let result=await userModel.find();
    let response:Array<object>=[];
    result.forEach((val)=>{
        let obj={
            userName:val.userName,
            mobileNo:val.mobileNo,
            relativeName:val.relativeName,
            relation:val.relation,
            address:val.address,
            balance:val.balance,
            id:val._id
        }
        response.push(obj);
    });
    return NextResponse.json({success:true,userData:response},{status:200});
    }catch(error){
        return NextResponse.json({error:error,message:"get all users Request failed"},{status:500});
    }
}