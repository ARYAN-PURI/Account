import mongoose from "mongoose";
let userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please Provide a User Name"]
    },
    mobileNo:{
        type:Number
    },
    relativeName:{
        type:String,
    },
    relation:{
        type:String,
    },
    address:{
        type:String,
        required:[true,"Please Provide Address"]
    },
    itemsDetails:{
        type:Array
    },
    balance:{
        type:Number
    },
    createdDate:{
        type:Date
    },
    modifyDate:{
        type:Date
    }
});
let userModel=mongoose.models.users || mongoose.model('users',userSchema);
export default userModel;