import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props{
    onAdd:(activity:string, hours:number) =>void
}
const TimeForm = ({onAdd}: Props) => {

    const [activity, setActivity]= useState("");
    const [hours, setHours]= useState("");

    const handleSubmit = () =>{
        if(!activity.trim || !hours) alert("Please fill it");

        onAdd(activity,Number(hours));
        setActivity("");
        setHours("");
    }
    
  return (
    <div className='space-y-3'>
        
        <Input
    placeholder='Activity (eg: Sleep)'
    value={activity}
    onChange={(e) => setActivity(e.target.value)}/>

    <Input
    type='number'
    placeholder='Hours (eg: 3)'
    value={hours}
    onChange={(e) => setHours(e.target.value)}/>

    <Button className='w-full' onClick={handleSubmit}>
        Add Activity
    </Button>
    </div>
  )
}

export default TimeForm