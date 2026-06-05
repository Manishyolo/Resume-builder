import { NextRequest,NextResponse } from "next/server";
import { connectTodb } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req:NextRequest){

  try{
    await connectTodb();
    const userid = await getCurrentUser();

    console.log(user);

  }
  catch(error){

  }
}