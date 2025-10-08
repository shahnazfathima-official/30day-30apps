import React from 'react'
import {motion} from 'framer-motion'

const Square = ({value, onClick}) => {

  return (
    <motion.button className=' w-[90px] h-[90px] 
    bg-[#2d142c] flex items-center 
    justify-center font-bold text-4xl'
    whileTap={{scale:0.9}}
    onClick={onClick}>
        {value}
    </motion.button>
  )
}

export default Square
// 2d142c, 510a32