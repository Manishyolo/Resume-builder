import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required:true
  },
  title: String,
  summary: String,
  personalInfo: {
    type: {
      fullname: String,
      email: String,
      mobile: String,
      location: String,
      github: String,
      linkedIn: String,
      portfolio: String,
    },

    default: {},
  },
  workExperience: {
    type: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    default: [],
  },
  projects:{
    type:[
        {
           title:String,
    description:String,
    githubUrl:String,
    liveUrl:String,
    techStack:[String], 
        }
    ],
    default:[]
  },
  skills:{
    type:[String],
    default:[]
  },
  education:{
    type:[
        {
               institute:String,
    degree:String,
    startDate:String,
    endDate:String,
        }
    ],
    default:[]
  },
   certifications:{
       type:[String],
       default:[]
   }

});

export const resumeModel = mongoose.model("resumes",resumeSchema)
