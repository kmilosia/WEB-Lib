import React from 'react'
import { BsDot } from 'react-icons/bs'

function AvailabilityElement({isAvailable}) {
  return (
    <div className={`flex items-center justify-center ${isAvailable ? 'text-green-500' : 'text-gray-400'}`}>
        <BsDot className='text-xl'/>
        <p className='font-semibold text-xs cursor-default'>{isAvailable ? "Dostępna" : "Niedostępna"}</p>
    </div>
  )
}

export default AvailabilityElement
