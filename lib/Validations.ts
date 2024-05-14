import * as z from 'zod';

export const eventFormSchema=z.object({
    title:z.string().min(3,"title must be atleast 3 chars"),
    description:z.string().min(3,"description must be atleast 3 chars")
        .max(400,"desciption cannot exceed 400chars"),
    location:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url(),
    cateogoryId:z.string(),
    imageUrl:z.string()

})
