import { IRegisterbody } from "@/types/user.types";
import { NextResponse, NextRequest } from "next/server";

async function POST(req: NextRequest) {
  try {
    const body: IRegisterbody = await req.json();
    const {username,email,password} = body;
    


    if(!username || !password || !email){
        return 
    }


  } catch (error) {
    console.log("error in register api", error);
  }
}
