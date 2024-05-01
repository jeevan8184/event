
export const HomeCardLinks=[
    {
        label:'Home',
        route:'/'
    },
    {
        label:'Create Event',
        route:'/event/create'
    },
    {
        label:'profile',
        route:'/profile'
    }
]

export const eventDefaultVals={
    title:'',
    description:'',
    imageUrl:'',
    startDateTime:new Date(),
    endDateTime:new Date(),
    createdAt:new Date(),
    price:'',
    isFree:false,
    location:'',
    url:'',
    cateogory:''
}