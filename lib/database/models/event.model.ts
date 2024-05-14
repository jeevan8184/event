
import mongoose, { Schema, model,Document } from 'mongoose';
import { models } from 'mongoose';
import Cateogory from './cateogory.model';
import User from './user.model';

export interface IEvent extends Document {
        title:string;
        description?:string;
        imageUrl:string;
        startDateTime:Date;
        endDateTime:Date;
        price:string;
        isFree:boolean;
        location?:string;
        createdAt:Date;
        url?:string;
        cateogory:{_id:string,name:string};
        organizer:{_id:string,firstName:string;lastName:string};
}

const EventSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String},
    imageUrl:{type:String,required:true},
    startDateTime:{type:Date,default:Date.now},
    endDateTime:{type:Date,default:Date.now},
    price:{type:String},
    isFree:{type:Boolean,default:false},
    location:{type:String},
    createdAt:{type:Date,default:Date.now},
    url:{type:String},
    cateogory:{
        type:Schema.Types.ObjectId,
        ref:'Cateogory'
    },
    organizer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
})

const Event=models.Event || model('Event',EventSchema);

export default Event;
