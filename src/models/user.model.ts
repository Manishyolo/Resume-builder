import mongoose, { mongo } from "mongoose";
import { IUser } from "@/types/user.types";
import { Document } from "mongoose";
import bcrypt from "bcrypt"

export interface UserDocument extends Omit<IUser,'_id'>, Document{
    comparePassword(password:string):boolean
}

const userSchema = new mongoose.Schema<UserDocument>({
   username:{
    type:String,
    trim:true,
    required:[true,"username is required"]
   },
   email:{
    type:String,
    required:[true,"email is required"],
    unique:true
   },
   password:{
      type:String,
      required:[true,"password is required"]
   }
},{
    timestamps:true
})

userSchema.pre("save",function(){
    if(!this.isModified("password")) return
    this.password = bcrypt.hashSync(this.password,10);
})

userSchema.methods.comparePassword = function(password:string):boolean{
    return bcrypt.compareSync(password,this.password)
}


export const userModel = mongoose.model("users",userSchema);
