import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export async function GET(req:NextRequest){
    try{
        let response=await userModel.find();
        let nfUsers=response.length;
        let sale=0;
        let cash=0;
        let lend=0;
        response.forEach((val:any)=>{
            val.itemsDetails.forEach((newval:any)=>{
                if(newval.name==="cash"){
                    cash+=Number(newval.price);
                }
                else{
                    sale+=Number(newval.price);
                }
            })
        })
        lend=sale-cash;
        let numberData={
            nfUsers:nfUsers,
            cash:cash,
            lend:lend,
            sale:sale
        }
        return NextResponse.json({
            message:"Data Fatched Success",
            success:true,
            ...numberData
        },{status:200})
    }catch(error:any){
        return NextResponse.json({error:error,message:"Error in get Numbers API"},{status:500});
    }
}