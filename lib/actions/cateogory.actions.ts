"use server"

import { connectToDB } from "../database";
import Cateogory from "../database/models/cateogory.model";
import { handleError } from "../utils"


export const createCateogory=async({cateogoryName}:{cateogoryName:string})=> {

    try{
        await connectToDB();
        const newCat=await Cateogory.create({name:cateogoryName});

        return JSON.parse(JSON.stringify(newCat));
    }catch(error){
        handleError(error);
    }
}

export const getAllCateogorys=async()=> {

    try {
        await connectToDB();
        const allCats=await Cateogory.find();

        return JSON.parse(JSON.stringify(allCats));
    } catch (error) {
        handleError(error);
    }
}