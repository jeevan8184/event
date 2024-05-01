
import mongoose from 'mongoose';


let url=process.env.MONGODB_URL;

let cached=(global as any).mongoose || {conn:null,promise:null}

export const connectToDB=async()=> {
    if(cached.conn) return cached.conn;

        if(!url) throw new Error('No mongodb url pls provide');

        cached.promise=cached.promise || mongoose.connect(`${url}`,{
            dbName:'event'
        });
        cached.conn=await cached.promise;
        return cached.conn;

}