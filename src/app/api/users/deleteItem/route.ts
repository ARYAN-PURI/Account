import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
export const revalidate = 0;
connect();
export async function POST(req:NextRequest){
    try{
        let reqBody=await req.json();
        let user:any=await userModel.findOne({_id:reqBody.id});
        let deletedItem=user.itemsDetails.splice(reqBody.index,1);
        if(user.itemsDetails.length>0){
            user.modifyDate=user.itemsDetails[user.itemsDetails.length-1].date;
        }
        else{
            user.modifyDate=undefined;
        }
        if(deletedItem[0].name==="cash"){
            user.balance+=Number(deletedItem[0].price);
        }
        else{
            user.balance-=Number(deletedItem[0].price);
        }
        let response=await user.save();
        return NextResponse.json({message:"Item Deleted Success",success:true,...response},{status:200});
        }catch(error:any){
            console.log(error);
            return NextResponse.json({error:error,message:"Error occur at delete Item api"},{status:500});
    }
}