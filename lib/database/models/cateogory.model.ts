

import { Schema, model,Document,models } from 'mongoose';


export interface ICateogory extends Document {
    _id:string;
    name:string;
}

const CateogorySchema=new Schema({
    name:{type:String,required:true,unique:true}
})

const Cateogory=models.Cateogory || model('Cateogory',CateogorySchema);

export default Cateogory;
