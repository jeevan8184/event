import { createUser, getUserByClerkId } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const OnBoard =async () => {

    const user=await currentUser();
    const router=useRouter();

    if(!user) redirect('/sign-in');
    const existUser=await getUserByClerkId(user?.id);
    if(existUser) router.push('/');

    const newUser=await createUser({
        username:user?.username!,
        clerkId:user?.id!,
        firstName:user?.firstName!,
        lastName:user?.lastName!,
        email:user?.emailAddresses[0].emailAddress!,
        photo:user?.imageUrl!
    })
    if(newUser) router.push('/');

}

export default OnBoard