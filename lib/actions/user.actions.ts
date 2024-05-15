"use server"

import mongoose from 'mongoose';
import User from '../database/models/user.model';
import { CreateUserParams,UpdateUserParams } from '@/types';
import { connectToDB } from '../database';
import { handleError } from '../utils';
import Event from '../database/models/event.model';
import Order from '../database/models/order.model';
import { revalidatePath } from 'next/cache';

export const createUser=async(user:CreateUserParams)=>{
    console.log('user',user);
    
    try {
        await connectToDB();
        const newUser=await User.create(user);
        
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const updateUser=async(user:UpdateUserParams,clerkId:string)=> {

    try {
        await connectToDB();
        const existUser=await User.findOneAndUpdate({clerkId},user,{new:true});

        if(!existUser) throw new Error('user not updated!');

        return JSON.parse(JSON.stringify(existUser));
    } catch (error) {
        handleError(error);
    }
}

export const getUserById=async(userId:string)=> {

    try {
        await connectToDB();
        const existUser=await User.findById(userId);

        if(!existUser) throw new Error('user not found with id');

        return JSON.parse(JSON.stringify(existUser));
    } catch (error) {
        handleError(error);
    }
}

export const getUserByClerkId=async(clerkId:string)=> {

    try {
        await connectToDB();
        const existUser=await User.findOne({clerkId});

        if(!existUser) throw new Error('user not found with id');

        return JSON.parse(JSON.stringify(existUser));
    } catch (error) {
        handleError(error);
    }
}


export const deleteUser=async(clerkId:string)=> {

    try {
        await connectToDB();
        const existUser=await User.findOne({clerkId});

        if(!existUser) throw new Error('user not found!..');
        
        await Promise.all([
            Event.updateMany(
                {_id:{$in:existUser.events}},
                {$pull:{organizer:existUser._id}}
            ),
            Order.updateMany(
                {_id:{$in:existUser.orders}},
                { $unset: { buyer: 1 } }
            )
        ])
        const deleteUser=await User.findByIdAndDelete(existUser._id);
        revalidatePath('/');
        
        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) :null

    } catch (error) {
        handleError(error);
    }
}

