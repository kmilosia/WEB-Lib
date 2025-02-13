import React from 'react'
import { GiSecretBook } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function LogoButton(props) {
  return (
    <Link to='/' onClick={props.onClick} className={`flex flex-row w-max items-center transition-color duration-300 ${props.color === 'light' ? 'text-gray-200 hover:text-gray-300' : `text-purple-500 hover:text-purple-600`} `}>
        <GiSecretBook className='text-3xl 2xl:4xl mx-1'/>
        <h1 className='text-lg 2xl:text-xl font-semibold font-delius self-end'>Spellarium</h1>
    </Link> 
  )
}

export default LogoButton
