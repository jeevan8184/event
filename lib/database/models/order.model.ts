
import mongoose, { Schema, model,Document } from 'mongoose';
import { models } from 'mongoose';

export interface IOrder extends Document {
    createdAt:Date,
    stipeId:string,
    totalAmt:string,
    event:{
        _id:string,
        title:string
    },
    buyer:{
        _id:string,
        firstName:string,
        lastName:string
    }
}

export type IOrderItem ={
    _id: string
    totalAmt: string
    createdAt: Date
    eventTitle: string
    eventId: string
    buyer: string
}

const OrderSchema=new Schema({
    createdAt:{type:Date,default:Date.now},
    stripeId:{type:String,unique:true,required:true},
    totalAmt:{type:String},
    event:{type:Schema.Types.ObjectId,ref:'Event'},
    buyer:{type:Schema.Types.ObjectId,ref:'User'}
})

const Order=models.Order || model('Order',OrderSchema);

export default Order;