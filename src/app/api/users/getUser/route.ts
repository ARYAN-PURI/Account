import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export const revalidate = 0;
export async function POST(req:NextRequest){
    try{
        let groupedItems:any=[];
        let reqBody=await req.json();
        let user=await userModel.findOne({_id:reqBody.id});
        let index=0;
        user.itemsDetails.forEach((val:any)=>{
            let flag='r';
            for(let i=0;i<groupedItems.length;i++){
                if(new Date(groupedItems[i][0].date).getFullYear()===new Date(val.date).getFullYear()
                    && new Date(groupedItems[i][0].date).getMonth()===new Date(val.date).getMonth()
                    && new Date(groupedItems[i][0].date).getDate()===new Date(val.date).getDate())
                {
                    groupedItems[i].push({...val,index:index});
                    flag='g';
                    break;
                }
            }
            if(flag==='r'){
                let arr=[{...val,index:index}];
                groupedItems.push(arr);
            }
            index++;
        });
        return NextResponse.json({
            message:"User Fetched Success",
            success:true,
            ...user,
            itemsDetails:groupedItems
        },{status:200});
    }catch(error:any){
        return NextResponse.json({error:error, message:"Error at fetching User details"},{status:500});
    }
}