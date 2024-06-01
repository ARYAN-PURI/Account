import connect from "@/dbConfig/connect";
import userModel from "@/models/userModel";
import {NextResponse} from "next/server";
connect();
export async function GET(){
    try {
        let response=await userModel.find();
        let groupedItems:any=[];
        response.forEach((val:any)=>{
            val.itemsDetails.forEach((newval:any)=>{
                let flag='r';
                let i=0
                for(;i<groupedItems.length;i++){
                    if(new Date(groupedItems[i][0].date).getFullYear()===new Date(newval.date).getFullYear()
                        && new Date(groupedItems[i][0].date).getMonth()===new Date(newval.date).getMonth()
                        && new Date(groupedItems[i][0].date).getDate()===new Date(newval.date).getDate())
                    {
                        let cross='r';
                        for(let k=0;k<groupedItems[i].length;k++){
                            if(new Date(newval.date).getTime()< new Date(groupedItems[i][k].date).getTime()){
                                groupedItems[i].splice(k,0,{
                                    name:newval.name,
                                    date:newval.date,
                                    price:newval.price,
                                    userName:val.userName,
                                    mobileNo:val.mobileNo,
                                    id:val._id
                                });
                                cross='g';
                                break;
                            }
                        }
                        if(cross==='r'){
                            groupedItems[i].push({
                                name:newval.name,
                                date:newval.date,
                                price:newval.price,
                                userName:val.userName,
                                mobileNo:val.mobileNo,
                                id:val._id
                            });
                        }
                        flag='g';
                        break;
                    }
                    if((new Date(groupedItems[i][0].date).getFullYear()>new Date(newval.date).getFullYear())
                        || ((new Date(groupedItems[i][0].date).getFullYear()===new Date(newval.date).getFullYear()) && (new Date(groupedItems[i][0].date).getMonth()>new Date(newval.date).getMonth()))
                        || ((new Date(groupedItems[i][0].date).getFullYear()===new Date(newval.date).getFullYear()) && (new Date(groupedItems[i][0].date).getMonth()===new Date(newval.date).getMonth()) && (new Date(groupedItems[i][0].date).getDate()>new Date(newval.date).getDate())))
                    {
                        flag='w';
                        break;
                    }
                }
                if(flag==='r'){
                    let arr=[{
                        name:newval.name,
                        date:newval.date,
                        price:newval.price,
                        userName:val.userName,
                        mobileNo:val.mobileNo,
                        id:val._id
                    }];
                    groupedItems.push(arr);
                }
                if(flag==='w'){
                    let arr=[{
                        name:newval.name,
                        date:newval.date,
                        price:newval.price,
                        userName:val.userName,
                        mobileNo:val.mobileNo,
                        id:val._id
                    }];
                    groupedItems.splice(i,0,arr);
                }
            });
        });
        let dailyData:any=[]
        groupedItems.forEach((val:any)=>{
            let cashCollected=0;
            let lendMoney=0;
            let sale=0
            val.forEach((newval:any)=>{
                if(newval.name==="cash"){
                    cashCollected+=Number(newval.price);
                }
                else{
                    sale+=Number(newval.price);
                }
            })
            lendMoney=sale-cashCollected;
            if(lendMoney<0){
                lendMoney=0;
            }
            let data={
                cashCollected:cashCollected,
                lendMoney:lendMoney,
                sale:sale
            }
            dailyData.push(data);
        })
        return NextResponse.json({message:"Records fetch Success",success:true,rData:[...groupedItems],dailyData:dailyData},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error,message:"Error occur at get records api"},{status:500});
    }
}