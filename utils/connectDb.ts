import mongoose from 'mongoose';
export default function connectDb(){
    const mongo_uri = process.env.MONGO_URI;
    //@ts-ignore
    return mongoose.connect(mongo_uri);
}