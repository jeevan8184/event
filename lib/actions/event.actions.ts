"use server"

import { 
    CreateEventParams, 
    DeleteEventParams, 
    GetAllEventsParams, 
    GetEventsByUserParams, 
    GetRelatedEventsByCategoryParams, 
    UpdateEventParams 
} from "@/types";
import { connectToDB } from "../database";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Cateogory from "../database/models/cateogory.model";



const getCateogoryByName=async(name:string)=> {
    return await Cateogory.findOne({name:{$regex:name,$options:'i'}});
}

const populateEvent=(query:any)=> {
    return query
        .populate({path:'organizer',model:User,select:'_id firstName lastName'})
        .populate({path:'cateogory',model:Cateogory,select:'_id name'})

} 

export const createEvent=async({userId,event,path}:CreateEventParams)=>{

    try {
        await connectToDB();
        const newEvent=await Event.create({...event,cateogory:event.categoryId,organizer:userId});
        revalidatePath(path);

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error);
        handleError(error);
    }
}

export const updateEvent=async({userId,event,path}:UpdateEventParams)=>{

    try {
        await connectToDB();
        const newEvent=await Event.findById(event._id);

        if (!newEvent || newEvent.organizer.toHexString() !== userId) {
            throw new Error('Unauthorized or event not found')
          }

        const updatedEvent=await Event.findByIdAndUpdate(
            newEvent._id,
            {...event,cateogory:event.categoryId},
            {new:true}
        )
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedEvent));

    } catch (error) {
        handleError(error);
    }
}

export const getEventById=async(eventId:string)=> {

    try {
        await connectToDB();

        const event=await Event.findById(eventId)
        .populate({path:'organizer',model:User,select:'_id firstName lastName'})
        .populate({path:'cateogory',model:Cateogory,select:'_id name'})

        if(!event) throw new Error('event not found with eventId');

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}

export const deleteEvent=async({eventId,path}:DeleteEventParams)=> {

    try {
        await connectToDB();
        const deletedEvent=await Event.findByIdAndDelete(eventId);
        if(deletedEvent) revalidatePath(path);

    } catch (error) {
        handleError(error);
    }
}

export const getAllEvents=async({query,category,limit=3,page=1}:GetAllEventsParams)=> {

    try {
        await connectToDB();
        const titleCondition=query ? {title:{$regex:query,$options:'i'}} :{};
        const cateogoryCondition=category ? await getCateogoryByName(category) : null;

        const conditions={
            $and:[titleCondition,cateogoryCondition ? {cateogory:cateogoryCondition._id} :{}]
        }

        const skipAmt=(Number(page)-1)*limit;

        const queryEVents=Event.find(conditions)
            .sort({createdAt:'desc'})
            .skip(skipAmt)
            .limit(limit)
            .populate({path:'organizer',model:User,select:'_id firstName lastName'})
            .populate({path:'cateogory',model:Cateogory,select:'_id name'})
            
        
        const allDocs=await Event.countDocuments(conditions);
        const events=await queryEVents.exec();

        return {
            data:JSON.parse(JSON.stringify(events)),
            totalPages:Math.ceil(allDocs/limit)
        }
        
    } catch (error) {
        handleError(error);
    }
}

export const getEventsByUser=async({userId,limit=3,page=1}:GetEventsByUserParams)=> {

    try {
        await connectToDB();
        
        const skipAmt=(Number(page)-1)*limit;
        
        const queryEVents=Event.find({organizer:{$in:userId}})
            .sort({createdAt:'desc'})
            .skip(skipAmt)
            .limit(limit)
            .populate({path:'organizer',model:User,select:'_id firstName lastName'})
            .populate({path:'cateogory',model:Cateogory,select:'_id name'})
        
        const events=await queryEVents.exec();
        const allDocs=await Event.countDocuments({organizer:{$in:userId}});

        return {
            data:JSON.parse(JSON.stringify(events)),
            totalPages:Math.ceil(allDocs/limit)
        }
        
    } catch (error) {
        handleError(error);
    }
}

export const getRelatedEventsByCategory=async({eventId,categoryId,limit=3,page=1}:GetRelatedEventsByCategoryParams)=> {

    try {
        await connectToDB();
        
        const skipAmt=(Number(page)-1)*limit;
        const query={$and:[{cateogory:{$in:categoryId}},{_id:{$ne:eventId}}]}
        
        const queryEVents=Event.find(query)
            .sort({createdAt:'desc'})
            .skip(skipAmt)
            .limit(limit)
            .populate({path:'organizer',model:User,select:'_id firstName lastName'})
            .populate({path:'cateogory',model:Cateogory,select:'_id name'})
            
        
        const events=await queryEVents.exec();
        const allDocs=await Event.countDocuments(query);

        return {
            data:JSON.parse(JSON.stringify(events)),
            totalPages:Math.ceil(allDocs/limit)
        }
        
    } catch (error) {
        console.log(error);
        handleError(error);
    }
}
