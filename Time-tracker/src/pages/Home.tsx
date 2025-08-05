import React, { useState } from 'react'
import TimeForm from '@/components/TimeForm'
import TimeChart from '@/components/TimeChart';

const Home = () => {

    const [data, setData] = useState<{activity:string; hours:number}[]>([]);

    const handleAdd = (activity:string, hours:number) => {
        console.log(activity,hours);
        setData((prev) => [...prev, {activity,hours}]);
        console.log(data);

    };
  return (
    <div
      className='max-w-md mx-auto p-6 mt-10 rounded-2xl shadow space-y-6'
      style={{ background: 'linear-gradient(135deg, #cf9aff, #95c0ff)' }}
    >
      <h1 className='text-2xl font-bold'>⏱Time Tracker</h1>
      <TimeForm onAdd={handleAdd} />
      <TimeChart data={data} />
    </div>
  )
}

export default Home