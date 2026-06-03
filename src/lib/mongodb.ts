import mongoose from "mongoose"

export const connectTodb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("connected to database")
    }catch(err){
         console.log("error while connecting to database",err)
    }
}