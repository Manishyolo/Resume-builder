import { NextResponse,NextRequest } from "next/server";
import { ILoginbody } from "@/types/user.types";
import { ApiResponse } from "@/types/api.types";
import { userModel } from "@/models/user.model";
import { connectTodb } from "@/lib/mongodb";
import { genrateToken } from "@/lib/jwt";

export async function POST(req:NextRequest){
    try {
    
       await connectTodb()
    
        const body:ILoginbody = await req.json();
        const {email,password} = body;
        
    
    
        if( !password || !email){
            return NextResponse.json<ApiResponse>({
              success:false,message:"userfields are required"
            },{
              status:400
            })
        }
    
        const isExisted = await userModel.findOne({email})
    
        if(!isExisted) return NextResponse.json<ApiResponse>({
          success:false,message:"user not found"
        },{
          status:409
        })
       
        const isPasswordCorrect = isExisted.comparePassword(password);

        if(!isPasswordCorrect){
          return NextResponse.json<ApiResponse>({
          success:false,message:"invalid credentials"
        },{
          status:409
        })
        }
   
      const token =  genrateToken({userId:isExisted._id.toString(),email})
    
      let response = NextResponse.json<ApiResponse>({
        success:true,message:"user login succesfully",data:isExisted,
      },{
        status:200
      })
    
      response.cookies.set("token",token,{
        httpOnly:true,
        sameSite:"lax",
        maxAge:60 * 60 * 1000
      })  
    
      return response
    
      } catch (error) {
        console.log("error in login api", error);
        return NextResponse.json({success:false,message:"Something went wrong",error},{
          status:500
        })
      }
}