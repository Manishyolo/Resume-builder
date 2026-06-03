export interface IUser {
    _id:string,
    username:string,
    email:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date
}

export interface IRegisterbody{
     username:string,
    email:string,
    password:string,
}

export interface ILoginbody{
     email:string,
    password:string,
}

export interface JWTPayload{
     userId:string,
     email?:string
}