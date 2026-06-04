import { genrateToken } from "@/lib/jwt";
import { connectTodb } from "@/lib/mongodb";
import { userModel } from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { IRegisterbody } from "@/types/user.types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {

   await connectTodb()

    const body: IRegisterbody = await req.json();
    const {username,email,password} = body;
    


    if(!username || !password || !email){
        return NextResponse.json<ApiResponse>({
          success:false,message:"userfields are required"
        },{
          status:400
        })
    }

    const isExisted = await userModel.findOne({email})

    if(isExisted) return NextResponse.json<ApiResponse>({
      success:false,message:"user already registred"
    },{
      status:409
    })
   
  const  newUser = await userModel.create({username,email,password});

  const token =  genrateToken({userId:newUser._id.toString(),email})

  let response = NextResponse.json<ApiResponse>({
    success:true,message:"user created succesfully",data:newUser,
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
    console.log("error in register api", error);
    return NextResponse.json({success:false,message:"Something went wrong",error},{
      status:500
    })
  }
}
