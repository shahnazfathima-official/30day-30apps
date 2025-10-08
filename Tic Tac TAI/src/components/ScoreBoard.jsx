import React from 'react'

const Scoreboard = ({score}) => {
    //  console.log(score);
  return (
    <div className='font-bold text-lg flex justify-between w-[300px] mb-4'>
        <div className='text-[#53bae6]'>You (X) : {score.X}</div>
        <div className='text-[#ec429a]'>AI (O) : {score.O}</div>
        
    </div>
  )
}

export default Scoreboard