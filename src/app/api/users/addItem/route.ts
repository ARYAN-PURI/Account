import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export const revalidate = 0;
export async function POST(req:NextRequest){
    try{
        let reqBody=await req.json();
        let user:any=await userModel.findOne({_id:reqBody.id});
        user.itemsDetails.push({
            name:reqBody.name,
            price:reqBody.price,
            date:reqBody.date
        });
        if(reqBody.name==="cash"){
            user.balance-=Number(reqBody.price);
        }
        else{
            user.balance+=Number(reqBody.price);
        }
        user.modifyDate=new Date();
        let response= await user.save();
        return NextResponse.json({message:"Item Added",success:true,...response},{status:200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:error, message:"Error at adding item api"},{status:500});
    }
}