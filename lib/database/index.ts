
import mongoose,{connect} from 'mongoose';

let url=process.env.NEXT_PUBLIC_MONGODB_URL;

let cached=(global as any).mongoose || {conn:null,promise:null}

export const connectToDB=async()=> {

        try {

            if(cached.conn) return cached.conn;

            if(!url) throw new Error('No mongodb url pls provide');

            cached.promise= cached.promise || connect(url,{
                dbName:'event',
                bufferCommands:false
            });
            cached.conn=await cached.promise;
            return cached.conn;
            
        } catch (error) {
            console.log(error);
        }

}
 